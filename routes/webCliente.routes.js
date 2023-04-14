const express = require('express');
const { Router } = require('express');
const routerWebCliente = Router();
const {
    webCliente,
} = require('../controllers/webClientes.controller')


routerWebCliente.get('/', webCliente)

module.exports = routerWebCliente;