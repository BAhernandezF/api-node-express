
const { json } = require('body-parser');
const { response } = require('express');
const Clientes = require('../models/clientes');



const clienteGet = async (req, res, next) => {
    try {
        const clientesLista = await Clientes.buscarCliente();
        if (clientesLista.length === 0) {
            res.status(404).json({
                msg: "No se existen datos para mostrar"
            })
        }
        
        res.status(200).json(clientesLista);

    } catch (error) {
        console.log(error);
    }

};

const clienteGetId = async (req, res, next) => {
    const { id } = req.params;
    try {
        const clientesListaId = await Clientes.buscarClienteId(id);
        if (clientesListaId.length <= 0) {
            res.status(404).json({
                msg: "Cliente no existente"
            })
        }
        
        res.status(200).json(clientesListaId);

    } catch (error) {
        console.log(error);
    }


};

const clientePost = async (req, res) => {
    
    const {nombre, apellido} = req.body;
    const insertar = await Clientes.insertarCliente(nombre, apellido);
    
    if (insertar.length === 0) {
        res.status(404).json({
            msg: "No se ha podido insertar"
        })
    }

    res.status(201).json({
        msg: 'creado con exito',
        nombre: nombre,
        apellido: apellido,
        clienteID: insertar.insertId
    });

}

const clientePut = async (req, res) => {
    const { id } = req.params;
    const {nombre, apellido} = req.body;
    const actualizarCliente = await Clientes.actualizarCliente(nombre, apellido, id)
    if(actualizarCliente.affectedRows === 0) return res.status(404).json({
        message: 'empleado no encontrado!'
    })
    console.log(actualizarCliente);
    res.status(202).json({
        message: 'cliente actualizado con exito',
        clienteid: id,
        nombre: nombre,
        apellido: apellido
    });

}

const clienteDelete = (req, res) => {
    res.status(202).json({
        msg: 'delete api'
    });
}

const clientePostErr = (req, res) => {
    res.status(404).json({
        msg: 'no existe'
    });
}

module.exports = {
    clienteGet,
    clientePost,
    clientePut,
    clienteDelete,
    clientePostErr,
    clienteGetId
}