const db = require('../utils/database');


module.exports = class User {
    constructor(nombre, email, password) {
        this.nombre = nombre;
        this.email = email;
        this.password = password;
    }
    

    static async buscar(email){
        const [rows] = await db.query("SELECT * FROM users where email = ?;", [email])
        return rows;
    }

    static async guardar(user){

        //hashear password

        const [rows] = await db.query(
            'INSERT INTO users (nombre, email, password) VALUES (?, ?, ?)',
            [user.nombre, user.email, user.password]
        );

        return rows;
        
    }

    //static hashPass()


};

