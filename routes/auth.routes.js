const express = require('express');
const { Router } = require('express');
const {body, validationResult} = require('express-validator');

const routerUser = Router();

const {
    autenticar,
    registrar,
    pruebaUsuario,
    perfil
} = require('../controllers/user.controller');
const auth = require('../middleware/verificacion')

//prueba de usuarios
routerUser.get('/pruebauser', auth.verificacion ,pruebaUsuario); 
//registro de usuarios
routerUser.post('/registro',validarRegistro(), registrar);
//login de usuarios
routerUser.post('/login', autenticar);
//perfil de usuario
routerUser.get('/perfil/:id', auth.verificacion ,perfil); 







//funciones
function validarRegistro() {
    return nombreVal =[
        body('nombre')
            .not()
            .isEmpty()
            .withMessage('un nombre de usuario es requerido')
            .exists()
            .trim()
            .escape()
        ];

}

module.exports = routerUser;