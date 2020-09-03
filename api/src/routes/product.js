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

// Muestra las categorias
server.get('/category', (req, res, next) => {
	Category.findAll()
		.then(categoria => {
			res.send(categoria);
		})
		.catch(next);
});

// Crear categoría
server.post('/category', (req, res, next) => {


	Category.findOrCreate({ // lo que hace es buscar o crear la categoría

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

// S19: Crear Ruta para eliminar Categoria
// DELETE /products/category/:id
server.delete('/category/:id', (req, res, next) => {
	const { id } = req.params;
	const idCat = Category.findOne({
		where: {
			id: id
		}
	})
		.then(value => {
			// console.log(idCat);
			Category.destroy({
				where: {
					id: id
				}
			})
			console.log(value);
			if (!value) {
				return res.status(404).json({ message: 'Id inváldio' });
			}
			res.status(200).json({ message: 'Categoría eliminada exitosamente' });
		})
		.catch(err => {
			return res.status(404).json({ err });
		})
});

server.get('/category/:nameCat', async (req, res, next) => {
	const { nameCat } = req.params;
	try {
		const idCategoria = await Category.findAll({
			attributes: ['id']
			,
			where: {
				name: nameCat
			}
		})

		const listaProductos = await prodcat.findAll({
			where: {
				categoryId: idCategoria[0]['dataValues']['id']
			}
		})
		if (!listaProductos) {
			return res.status(404).json({ message: "No existen productos con esa categoria" })
		}
		console.log(listaProductos)
		const idProductos = listaProductos.map((producto) => {
			return producto['productId']
		})
		const resultado = await Product.findAll({
			where: {
				id: idProductos
			}
		})
		console.log(idProductos)
		return res.status(200).json(resultado)



	} catch (error) {
		res.status(404).send(error.message)
	}







});


module.exports = server;

// GET /products/categoria/:nombreCat

// Retorna todos los productos de {nombreCat} Categoría.