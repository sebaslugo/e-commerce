const server = require('express').Router();
const { Product, Category, prodcat } = require('../db.js');

server.get('/', (req, res, next) => {
	Product.findAll()
		.then(products => {
			res.send(products);
		})
		.catch(next);
});


// 	POST /products/:idProducto/category/:idCategoria
// Agrega la categoria al producto.
server.post('/:idProducto/category/:idCategoria', (req, res, next) => {
	const { idProducto, idCategoria } = req.params;

	const idProd = Product.findAll({
		where: {
			id: idProducto
		}
	});
	const idCat = Category.findAll({
		where: {
			id: idCategoria
		}
	});
	Promise.all([idProd, idCat])
		// .then((values) => console.log(values[0].dataValues))
		.then((values) => {
			prodcat.create({ productId: idProducto, categoryId: idCategoria })
			res.status(200).json({ message: 'Categoría asignada a un producto' });
		})
		// .catch(err => console.error(err.message))
		.catch(err => {
			return res.status(404).send(err.message)
			// (node:10476) UnhandledPromiseRejectionWarning: Unhandled promise rejection.
			// (node:10476) [DEP0018] DeprecationWarning: Unhandled promise rejections are deprecated. In the future, promise rejections that are not handled will terminate the Node.js process with a non-zero exit code.
		});
});

// DELETE /products/:idProducto/category/:idCategoria
// Elimina la categoria al producto.
server.delete('/:idProducto/category/:idCategoria', (req, res, next) => {
	const { idProducto, idCategoria } = req.params;

	const idProd = Product.findAll({
		where: {
			id: idProducto
		}
	});
	const idCat = Category.findAll({
		where: {
			id: idCategoria
		}
	});
	// idProd.then(idCat.then()).catch(err => console.error(err.message));
	Promise.all([idProd, idCat])
		// .then((values) => console.log(values[0].dataValues))
		.then((values) => {
			prodcat.destroy({
				where: {
					productId: idProducto, categoryId: idCategoria
				}
			})
			// console.log(values);
			if (values[0].length < 1 || values[1].length < 1) {
				return res.status(404).json({ message: 'El id enviado es inválido' });
			}
			res.status(200).json({ message: 'Se borro la categoría del producto' });
		})
		// .catch(err => console.error(err.message))
		.catch(err => {
			return res.status(404).send(err.message)
			// (node:10476) UnhandledPromiseRejectionWarning: Unhandled promise rejection.
			// (node:10476) [DEP0018] DeprecationWarning: Unhandled promise rejections are deprecated. In the future, promise rejections that are not handled will terminate the Node.js process with a non-zero exit code.
		});
});



server.get('/category', (req, res, next) => {
	Category.findAll()
		.then(categoria => {
			res.send(categoria);
		})
		.catch(next);
});

server.post('/category', (req, res, next) => {

	Category.findOrCreate({ // lo que hace es buscar o crear la categoria
		where: {
			name: req.body.name,
			description: req.body.description
		}
	}).then(function (categoria) {
		res.status(201).json({ categoria })
	})
});

server.put("/category/:id", (req, res, next) => {
	Category.findOne({
		where: {
			id: req.params.id
		}
	}).then(function (categoria) {
		if (!categoria) {
			return res.status(404).json({ message: "error" })
		}
		res.status(200).json({ categoria })
	})

	// .catch(error => {
	//     res.status(404).json({message: error})
	// })
})
module.exports = server;

