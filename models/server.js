const express = require('express');
const cors = require('cors');
const bodyparser = require('body-parser');
const errorHandler = require('../middleware/errorHandler')



class Server {
    constructor(){

        this.app = express();
        this.port = process.env.PORT;
        this.clientesRutas = '/api/clientes';
        this.authRutas = '/api/usuarios';

        //middlewares
        this.middlewares();
        //rutas
        this.routes();
    }

    middlewares(){
        //cors
        this.app.use(errorHandler);
        this.app.use( cors() );
        this.app.use(bodyparser.json());
        this.app.use((req, res, next)=>{
            res.setHeader('Access-Control-Allow-Origin', '*');
            res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
            res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
            next();
        });
    }

    routes(){

        this.app.use(this.clientesRutas, require('../routes/clientes.routes'));
        this.app.use(this.authRutas, require('../routes/auth.routes'));


        this.app.all('*', (req, res, next)=>{
            const err = new Error(`la URL ${req.path} no fue encontrada`);
            err.statusCode = 404;
            next(err);
        });

        this.app.use((err, req, res, next)=>{
            const statusCode = err.statusCode || 500;
            res.status(statusCode).json({
                success: 0,
                message: err.message,
                stack: err.stack
            });
        });
        
    }

    listen(){
        this.app.listen(this.port);
        console.log('servidor corriendo en puerto', this.port);
    }
}

module.exports = Server;