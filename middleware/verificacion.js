// importacion de modulos
const jwt = require('jwt-simple');
const moment = require('moment');
// importar clave secreta
const libjwt = require('../helpers/generarJWT');
const secret = libjwt.secret;


// MIDDLEWARE de autencicacion
exports.verificacion = (req, res, next ) =>{

    // Comprueba que llegue la cabecera de autenticacion
    if(!req.headers.authorization){
        return res.status(403).send({
            status: "error",
            msg: "La peticion no tiene la cabecera de autenticacion"
        })
    }
    //limpia token
    let token = req.headers.authorization.replace(/['"]+/g, '');

    // decodifica el token
    try {
        let payload = jwt.decode(token, secret);

        //Comprueba expiracion del token
        if(payload.exp <= moment().unix()){
            return res.status(404).send({
                status: "error",
                msg: "Token expirado",
            })
        }

        //agrega datos de usuario a request
        req.user = payload;


    } catch (error) {
        return res.status(404).send({
            status: "error",
            msg: "Token invalido",
            error
        })
    }


    //Pasar a ejecucion
    next();
}

