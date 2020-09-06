const server = require('express').Router();
const { Product, Category, prodcat } = require('../db.js');
const Sequelize = require('sequelize');

/* ------------------------------------------------------------------------------- */
/* S23: Crear ruta que retorne productos segun el keyword de búsqueda */
/* ------------------------------------------------------------------------------- */
server.get('/', (req, res, next) => {
    const Op = Sequelize.Op;    
    Product.findAll({
        [Op.or]: [{
            name: { [Op.like]: '%' + req.query.query + '%' }
        }, {
            description: { [Op.like]: '%' + req.query.query + '%' }
        }]
    })
    .then((producto) => {
        res.status(200).json(producto);
    });
});

module.exports = server;