const express = require('express');
const { Router } = require('express');
const {body, validationResult} = require('express-validator');

const routerUser = Router();

const {
    autenticar,
    registrar,
} = require('../controllers/user.controller');

routerUser.post('/registro',validarRegistro(), registrar); //registro de usuarios
routerUser.post('/login', autenticar); //login de usuarios

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