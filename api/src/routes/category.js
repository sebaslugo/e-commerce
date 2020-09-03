// const server = require('express').Router();
// const { Category } = require('../db.js');

// // server.get('/', (req, res, next) => {
// //     Product.findAll()
// //     .then(products => {
// //         res.send(products);
// //     })
// //     .catch(next);
// // });

// server.post('/', (req, res) => {

//     Category.findOrCreate({ // lo que hace es buscar o crear el usuariio
//         where: {
//             name: req.body.name,
//             description: req.body.description
//         }
//     }).then(function (categoria) {
//         res.status(201).json({ categoria })
//     })
// });


// POST /products/category/

// Crea una categoría nueva.