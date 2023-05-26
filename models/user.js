const db = require('../utils/database');
const bcrypt = require('bcrypt');



module.exports = class User {
    constructor(nombre, email, password) {
        this.nombre = nombre;
        this.email = email;
        this.password = password;
        this.rol = rol;
    }
    

    static async buscar(email){
        const [rows] = await db.query("SELECT * FROM users where email = ?;", [email])

        return rows;
    }

    static async guardar(user){

        //hashea contraseña
        const hashedpassword = this.hashPass(user.password);
        console.log(hashedpassword);

        const [rows] = await db.query(
            'INSERT INTO users (nombre, email, password) VALUES (?, ?, ?)',
            [user.nombre, user.email, hashedpassword, user.rol]
        );

        return rows;
        
    }

    static hashPass(password){
        password =  bcrypt.hashSync(password, 10);
        return password;

    }

    static async buscarPorId(id){
        const [rows] = await db.query("SELECT id, nombre, email FROM users where id = ?;", [id])

        return rows;
    }




};

