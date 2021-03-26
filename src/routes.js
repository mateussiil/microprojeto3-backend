const { Router } = require('express');
const uuid = require('uuid');
const routes = Router();
const multer = require('multer');
const config = require('../multer');
var fs = require('fs');

let rawdata = fs.readFileSync('./foods.json');
let foods = JSON.parse(rawdata);

const users = []

routes.post('/upload', multer(config).single('file'), (req, res) => {
    return res.json(foods)
});

routes.get('/foods', (req, res) => {
    return res.json(foods)
});

routes.get('/food/:ID', (req, res) => {
    const { ID } = req.params
    return res.json(foods[ID])
});

routes.post('/client', (req, res) => {
    const { name } = req.body
    const id = uuid.v4()

    users.push({ id: id, name: name })

    return res.json({ id, name })
});

routes.get('/pedidos', (req, res) => {
    let rawdata = fs.readFileSync('./pedidos.json');
    let pedidos = JSON.parse(rawdata);
    return res.json(pedidos)
});

routes.post('/pedido', (req, res) => {
    let rawdata = fs.readFileSync('./pedidos.json');
    let pedidos = JSON.parse(rawdata);
    const nPedido = pedidos.length
    const data = {
        nPedido,
        data: req.body,
        entregue: false
    }

    pedidos.push(data)

    const jsonString = JSON.stringify(pedidos)

    fs.writeFile('./pedidos.json', jsonString, err => {
        if (err) {
            console.log('Error writing file', err)
        } else {
            console.log('Successfully wrote file')
        }
    })

    return res.json(nPedido)
});

routes.get('/pedido/:ID', (req, res) => {
    const { ID } = req.params

    let rawdata = fs.readFileSync('./pedidos.json');
    let pedidos = JSON.parse(rawdata);

    if (ID < 0 || ID > pedidos.length) {
        return res.status(400).json({ message: "Número inválido" })
    }

    return res.json(pedidos[ID])
});

routes.post('/cardapio', (req, res) => {
    let rawdata = fs.readFileSync('./foods.json');
    let foods = JSON.parse(rawdata);

    const data={...req.body, index:foods.length + 1}

    foods.push({...data})

    const jsonString = JSON.stringify(foods)

    fs.writeFile('./foods.json', jsonString, err => {
        if (err) {
            console.log('Error writing file', err)
        } else {
            console.log('Successfully wrote file')
        }
    })

    return res.json({...data})
});

module.exports = routes;
