const { json } = require('body-parser');
const { response } = require('express');
const path = require('path');


const webCliente = (req, res) => {
    res.sendFile(path.join(process.env.PUBLICFILES + "public/index.html"));
}



module.exports = {
    webCliente,

}