const express = require('express');
const { Router } = require('express');
const router = Router();



const {
    clienteGet,
    clientePost,
    clientePut,
    clienteDelete,
    clientePostErr,
    clienteGetId
} = require('../controllers/clientes.controller')



router.get('/', clienteGet);

router.get('/:id', clienteGetId);

router.post('/post', clientePost);

router.put('/put/:id', clientePut);

router.delete('/delete', clienteDelete);

router.post('/error', clientePostErr);



module.exports = router;