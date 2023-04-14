
const db = require('../utils/database')
const fechaActual = () =>{
    let fecha = new Date();
    let dia = fecha.getDate();
    let mes = fecha.getMonth()+1;
    let anio = fecha.getFullYear();
    dia = ('0' + dia).slice(-2);
    mes = ('0' + mes).slice(-2);
    let tiempo = fecha.toLocaleTimeString();
    let fechaCompleta = `${anio}-${mes}-${dia} ${tiempo}`
    

    return fechaCompleta;
}

module.exports = class Clientes {
    constructor(nombre, apellido, fechaCreacion) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.fechaCreacion = fechaCreacion;

    }



    static async buscarCliente() {
        const [rows] = await db.query("SELECT * FROM clientes order by id desc;")
        return rows;
    }

    static async buscarClienteId(id) {
        const [rows] = await db.query("SELECT * FROM clientes where id = ?;", [id])
        return rows;
    }

    static async insertarCliente(nombre, apellido) {

        const fecha = fechaActual();

        const [rows] = await db.query("INSERT INTO clientes (nombre, apellido, fechaCreacion) values (?,?,?)", [nombre, apellido, fecha.toString()]);
        
        return rows;

    }

    static async actualizarCliente(nombre, apellido, id) {

        const fecha = fechaActual();

        const [result] = await db.query("UPDATE clientes SET nombre = ?, apellido = ?, fechaCreacion = ? WHERE id = ?", [nombre, apellido, fecha.toString(), id]);
        
        return result;

    }

}