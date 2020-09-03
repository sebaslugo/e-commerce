const server = require('express').Router();
const { Product } = require('../db.js');

server.get('/', (req, res, next) => {
	Product.findAll()
		.then(products => {
			res.send(products);
		})
		.catch(next);
});

server.get('/category', (req, res, next) => {
	Category.findAll()
		.then(categoria => {
			res.send(categoria);
		})
		.catch(next);
});

server.post('/category', (req, res, next) => {

	Category.findOrCreate({ // lo que hace es buscar o crear el usuariio
		where: {
			name: req.body.name,
			description: req.body.description
		}
	}).then(function (categoria) {
		res.status(201).json({ categoria })
	})
});

module.exports = server;
