const { json } = require('body-parser');
const { response } = require('express');
const {body, validationResult} = require('express-validator');
const bcrypt = require('bcrypt');



const User = require('../models/user');
const jwt = require('../helpers/generarJWT');


const pruebaUsuario = async (req, res, next) =>{
    return res.status(200).send({
        msg: "mensaje enviado desde la prueba de auth",
        usuario: req.user
    })
}


const autenticar = async (req, res, next) => {

    const { email, password } = req.body;
    
    try{
        const existeUsuario = await User.buscar(email)

        const usuarioEncontrado = existeUsuario[0];

        if (existeUsuario.length == 0) {
            const error = new Error('Usuario o contraseña incorrecta');
            return res.status(400).json({msg: error.message});
        }
    
        const passwordValido = bcrypt.compareSync(password, usuarioEncontrado.password);
    
        if (!passwordValido) {
            const error = new Error('Usuario o contraseña incorrecta');
            return res.status(400).json({msg: error.message});
        }

        //crea token
        
        const token = jwt.createToken(usuarioEncontrado);

        res.status(200).json({
            status: 'success',
            msg:'Usuario logeado correctamente',
            usuario: {
                nombre: usuarioEncontrado.nombre,
                email: usuarioEncontrado.email,
            },
            token
    
        });
    

    }
    catch (error) {
        if(error){
            res.status(400).json({
                error: 'ha ocurrido un error realizando la accion'
            })
        }

    }


};

const registrar = async (req, res, next) => {
    
    const { nombre, email, password } = req.body;
    const errors = validationResult(req);
    let rol = 'usuario';

    if (!errors.isEmpty()) {
        return res.status(400).json({ errores: errors.array() });
    }

    const existeUsuario = await User.buscar(email)
    if (existeUsuario != "") {
        const error = new Error('usuario ya registrado');
        return res.status(400).json({msg: error.message});
    }

    try {
        const usuarioValidado = {
            nombre: nombre,
            email: email,
            password: password,
            rol: rol
        }
        const validarRegistro = await User.guardar(usuarioValidado);
        if (validarRegistro.length === 0) {
            res.status(400).json({
                msg: "No se ha podido insertar"
            })
        }
        res.status(200).json({
            msg:'registrado',
            id: validarRegistro.insertId,
            nombre: nombre,
            email: email,

        });

    } catch (error) {
        res.status(400).json({
            error: error
        })
    }
    /*res.status(200).json({
        msg:'registrado',
        user: existeUsuario
    });*/

};

const perfil = async (req, res, next)=>{
    const {id} = req.params;

    //consulta para sacar los datos del usuario
    const existeUsuario = await User.buscarPorId(id)
    const usuarioEncontrado = existeUsuario[0];

    if(usuarioEncontrado == "" || usuarioEncontrado == undefined){
        return res.status(404).json({
            status: "error",
            msg: "usuario no existe"
        })
    }

    return res.status(200).send({
        status: "success",
        usuario: usuarioEncontrado
    })

}


module.exports = {
    autenticar,
    registrar,
    pruebaUsuario,
    perfil,
}