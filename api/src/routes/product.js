const server = require('express').Router();
const { Product } = require('../db.js');

server.get('/', (req, res, next) => {
	Product.findAll()
		.then(products => {
			res.send(products);
		})
		.catch(next);
});

server.get('/categoria/:nombreCat', (req, res, next) => {
	res.send("nada")
});

module.exports = server;

// GET /products/categoria/:nombreCat

// Retorna todos los productos de {nombreCat} Categoría.