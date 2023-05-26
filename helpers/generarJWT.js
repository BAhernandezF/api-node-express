const jwt = require('jwt-simple');
const moment = require('moment');

// Clave Secreta
const secret = 'CLAVE_SECRETA_API_ResT_PROPiA_00258';

//funcion crea token
const createToken = (user) =>{
    const payload = {
        id: user.id,
        name: user.nombre,
        email: user.email,
        rol: user.rol,
        iat: moment().unix(),
        exp: moment().add(30, "days").unix()
    }

    //devuelve token jwt

    return jwt.encode(payload, secret);
}


module.exports = {
    secret,
    createToken
}
