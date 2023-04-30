const { json } = require('body-parser');
const { response } = require('express');
const {body, validationResult} = require('express-validator');
const bcrypt = require('bcrypt');



const User = require('../models/user');

const autenticar = async (req, res, next) => {

    const { email, password } = req.body;

        
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

    res.status(200).json({
        msg:'Usuario logeado correctamente',
        nombre: usuarioEncontrado.nombre,
        email: usuarioEncontrado.email,

    });


};

const registrar = async (req, res, next) => {
    
    const { nombre, email, password } = req.body;

    const errors = validationResult(req);

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
            password: password
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


module.exports = {
    autenticar,
    registrar,
}