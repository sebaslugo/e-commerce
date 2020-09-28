const server = require('express').Router();
const { Product, Category, prodcat, Review,User } = require('../db.js');
const path = require('path');
const multer = require('multer');
const authentication = require('../jwt');
const isAdmin = require('../middlewares/isAdmin');

/* ------------------------------------------------------------------------------- */
/* Carga de imágenes */
/* ------------------------------------------------------------------------------- */

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, process.cwd() + "/images")//esto te trae la direccion del servidor
	},
	filename: (req, file, cb) => {
		cb(null, 'img' + '-' + Date.now() + file.originalname);
	}
});
const fileFilter = (req, file, cb) => {
	if (file.mimetype == 'image/jpeg' || file.mimetype == 'image/png') {
		cb(null, true);
	} else {
		cb(null, false);
	}
}
const upload = multer({ storage, fileFilter });

/* ------------------------------------------------------------------------------- */
/* NO ESPECIFICADO: Crear ruta para mostrar todas las categorias. */
/* ------------------------------------------------------------------------------- */
server.get('/category', (req, res, next) => {
	Category.findAll()
		.then(categoria => {
			res.send(categoria);
		})
		.catch(next);
});

/* ------------------------------------------------------------------------------- */
/* S17: Crear ruta para agregar categorias de un producto. */
/* ------------------------------------------------------------------------------- */
server.post('/:idProducto/category/:idCategoria', authentication.passport.authenticate('jwt',{session:false}), isAdmin, (req, res, next) => {
	const { idProducto, idCategoria } = req.params;
	prodcat.create({
		productId: idProducto, categoryId: idCategoria
	})
		.then(() => res.status(200).json({ message: 'Categoría ID: ' + idCategoria + ', asignada al producto ID: ' + idProducto + ' exitosamente.' }))
		.catch(err => res.status(404).json(err.message));
});

/* ------------------------------------------------------------------------------- */
/* S17 BIS: Crear ruta para sacar categorias de un producto. */
/* ------------------------------------------------------------------------------- */
server.delete('/:idProducto/category/:idCategoria', authentication.passport.authenticate('jwt',{session:false}), isAdmin, (req, res, next) => {
	const { idProducto, idCategoria } = req.params;
	prodcat.destroy({
		where: {
			productId: idProducto, categoryId: idCategoria
		}
	})
		.then(() => res.status(200).json({ message: 'Categoría ID: ' + idCategoria + ', eliminada del producto ID: ' + idProducto + ' exitosamente.' }))
		.catch(err => res.status(404).json(err.message));
});

/* ------------------------------------------------------------------------------- */
/* S18: Crear ruta para crear/agregar Categoria */
/* ------------------------------------------------------------------------------- */
server.post('/category', authentication.passport.authenticate('jwt',{session:false}), isAdmin, (req, res, next) => {
	const { name, description } = req.body;
	Category.findOrCreate({ // lo que hace es buscar o crear la categoría
		where: {
			name: name,
			description: description || 'Sin descripción'
		}
	})
		.then(() => res.status(200).json({ message: 'La categoría: ' + name + ', ha sido creada exitosamente.' }))
		.catch(err => res.status(400).json(err.message));
});

/* ------------------------------------------------------------------------------- */
/* S19: Crear Ruta para eliminar Categoria */
/* ------------------------------------------------------------------------------- */
server.delete('/category/:id', authentication.passport.authenticate('jwt',{session:false}), isAdmin, (req, res, next) => {
	const { id } = req.params;
	Category.destroy({
		where: {
			id: id
		}
	})
	.then(producto => {
		if (producto > 0) {
			return res.status(200).json({ message: 'La categoría ID: ' + id + ', ha sido eliminada correctamente.' });
		} else {
			return res.json({ message: 'El ID: ' + id + ', no corresponde a ninguna categoría en existencia.' });
		}
	})
	.catch(err => res.status(400).json(err.message));

});

/* ------------------------------------------------------------------------------- */
/* S20: Crear ruta para Modificar Categoria */
/* ------------------------------------------------------------------------------- */
server.put("/category/:id", authentication.passport.authenticate('jwt',{session:false}), isAdmin, (req, res, next) => {
	const { id } = req.params;
	let { name, description } = req.body;
	if (description == '') description = 'Sin descripción';
	Category.update(
		{ name, description },
		{ where: { id: id } }
	)
		.then(() => res.status(201).json({ message: 'La categoría: ' + name + ', ha sido actualizada exitosamente.' }))
		.catch(err => res.status(400).json(err.message));
});

/* ------------------------------------------------------------------------------- */
/* S21: Crear ruta que devuelva todos los productos */
/* ------------------------------------------------------------------------------- */
server.get('/', (req, res, next) => {
	Product.findAll({order:[['id','DESC']]})
		.then(products => {
			res.send(products);
		})
		.catch(next);
});

/* ------------------------------------------------------------------------------- */
/* S22: Crear Ruta que devuelva los productos de X categoria */
/* ------------------------------------------------------------------------------- */
server.get('/category/:nameCat', async (req, res, next) => {
	const { nameCat } = req.params;
	try {
		const idCategoria = await Category.findAll({
			attributes: ['id'],
			where: {
				name: nameCat
			},
			order:[['id','DESC']]
		});
		const listaProductos = await prodcat.findAll({
			where: {
				categoryId: idCategoria[0]['dataValues']['id']
			}
		});
		if (!listaProductos) {
			return res.status(404).json({ message: 'No existen productos para la categoría: ' + nameCat });
		}
		const idProductos = listaProductos.map((producto) => {
			return producto['productId']
		});
		const resultado = await Product.findAll({
			where: {
				id: idProductos
			}
		});
		return res.status(200).json(resultado);
	} catch (error) {
		res.status(404).json(error.message);
	}
});

/* ------------------------------------------------------------------------------- */
/* S24: Crear ruta de producto individual, pasado un ID que retorne un producto con sus detalles */
/* ------------------------------------------------------------------------------- */
server.get('/:id', async (req, res, next) => {
	const { id } = req.params;
	const producto = await Product.findOne({
		where: {
			id: id
		}
	});
	const categoriaProducto = await prodcat.findAll({
		where: {
			productId: id
		}
	});
	const listaCategorias = categoriaProducto.map((producto) => {
		return producto.categoryId
	});
	const categorias = await Category.findAll({
		where: {
			id: listaCategorias
		}
	});
	if (!producto) {
		return res.status(404).json({ err: 'El ID: ' + id + ', no corresponde a un producto existente.' });
	}
	return res.json({ producto, categorias });
});

/* ------------------------------------------------------------------------------- */
/* S25: Crear ruta para crear/agregar Producto */
/* ------------------------------------------------------------------------------- */
server.post('/', authentication.passport.authenticate('jwt',{session:false}), isAdmin, upload.array('image', 5), (req, res) => {
	const { name, description, price, stock } = req.body
	console.log(req.body);
	if (name && description && price && stock) {

		let images = 'sin_imagen.png';
		// dentro del req.file esta la propiedad que nos llega desde el front por lo tanto accedo ahi para consultar el length de "file" que es donde vienen las imagenes
		if (req.files.length > 0) {
			images = req.files.map(image => {
				return image.filename;
			}).join();
		}
		Product.create({
			name: name,
			description: description,
			price: price,
			stock: stock,
			image: images
		})
			.then(product => {
				return res.status(200).json(product);
			})
			.catch(err => res.status(400).json(err.message));
	} else {
		return res.status(400).json({ message: 'El producto no se puede crear si no envía todas las propiedades' });
	}
});
/* ------------------------------------------------------------------------------- */
/* S26: Crear ruta para Modificar Producto */
/* ------------------------------------------------------------------------------- */

server.put('/:id', authentication.passport.authenticate('jwt',{session:false}), isAdmin, upload.array('image', 5), (req, res, next) => {

	const { id } = req.params;

	const { name, description, price, stock,imagenes } = req.body;
	let images;

	if (req.files) {
		if (req.files.length > 0) {
			images = req.files.map(image => {
				return image.filename;
			}).join();
		}

	}
	console.log(imagenes)
	
	if(images && imagenes){
		images=imagenes + ',' + images
	}
	else if(imagenes || images){
		images=imagenes || images
	}		
	else{
	images = 'sin_imagen.png'
	}
	Product.findOne({
		where:{id:id}
	}).then((product) => {
		product.name=name
		product.description=description;
		product.price=price;
		product.stock=stock;
		product.image=images
		return product.save()
	})
	
		.then((product) => res.status(201).json(product))
		.catch(err => res.status(400).json(err.message));
});

/* ------------------------------------------------------------------------------- */
/* S27: Crear Ruta para eliminar Producto */
/* ------------------------------------------------------------------------------- */
server.delete('/:id', authentication.passport.authenticate('jwt',{session:false}), isAdmin, (req, res, next) => {
	const { id } = req.params;
	Product.destroy({
		where: {
			id: id
		}
	})
		.then(producto => {
			if (producto > 0) {
				return res.status(200).json({ message: 'El producto ID: ' + id + ', ha sido eliminado correctamente.' });
			} else {
				return res.json({ message: 'El ID: ' + id + ', no corresponde a ningún producto en existencia.' });
			}
		})
		.catch(err => res.send(400).json(err.message));
});

/* ------------------------------------------------------------------------------- */
/* S54 : Crear ruta para crear/agregar Review */
/* ------------------------------------------------------------------------------- */
server.post("/:id/review", authentication.passport.authenticate('jwt',{session:false}), (req, res) => {
	const { id } = req.params;
	const { description, rating, likes,userId} = req.body;
	console.log(req.body)
	let message;
	Review.create({
			description: description,
			rating: rating,
			likes: likes,
			productId: id,
			userId:userId
	}).then((mensaje) => {
		res.status(201).json({ message })
	})	
	.catch(() => res.status(400).send("el comentario no se pudo enviar...revisa bien tus datos!"))
})

/* ------------------------------------------------------------------------------- */
/* S57 : Crear Ruta para obtener todas las reviews de un producto. */
/* ------------------------------------------------------------------------------- */
server.get("/:id/review", (req, res) => {
	const { id } = req.params;
	Review.findAll({
		where: {
			productId: id,	
		},
		include:{model:User},
		order:[['id','DESC']]
	})
	.then(reviews => res.status(200).json(reviews))
	.catch(err => res.status(400).json(err.message))
})

/* ------------------------------------------------------------------------------- */
/* S55 : Crear ruta para Modificar Review */
/* ------------------------------------------------------------------------------- */
server.put("/:id/review/:idReview", authentication.passport.authenticate('jwt',{session:false}), (req, res) => {
	const { id, idReview } = req.params;
	console.log(req.params)
	const { description,rating,likes,userId} = req.body;
	Review.update(
		{ description: description, rating: rating, likes: likes },
		{ where: { productId: id, id: idReview,userId:userId} },
	)
	.then(() => res.status(200).send("el comentario ha sido actualizado exitosamente!"))
	.catch(err => res.status(400).json(err.message))

	
})

/* ------------------------------------------------------------------------------- */
/* S56 : Crear Ruta para eliminar Review */
/* ------------------------------------------------------------------------------- */
server.delete("/:id/review/:idReview", authentication.passport.authenticate('jwt',{session:false}), (req, res) => {
	const { id, idReview } = req.params;
	Review.destroy({
		where: {
			productId: id,
			id: idReview
		}
	})
	.then(rev => {
		if (rev > 0) {
			return res.status(200).json({ message: 'Tu comentario fue eliminado exitosamente!' });
		} else {
			return res.json({ message: 'El comentario que quieres borrar no se ha encontrado, verifica que exista de antemano' });
		}
	})
	.catch(err => res.status(400).json(err.message))
})

module.exports = server;