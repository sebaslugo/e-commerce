const server = require('express').Router();
const { Product, Category, prodcat } = require('../db.js');
const Sequelize = require('sequelize');

/* ------------------------------------------------------------------------------- */
/* S23: Crear ruta que retorne productos segun el keyword de búsqueda */
/* ------------------------------------------------------------------------------- */
server.get('/', (req, res, next) => {
    const Op = Sequelize.Op; 
    console.log(req.query.s);   
    Product.findAll({
        where: {
            [Op.or]: [{
                name: { [Op.iLike]: '%' + req.query.s + '%' }
            }, {
                description: { [Op.iLike]: '%' + req.query.s + '%' }
            }]
        }
    })
    .then((producto) => {
        res.status(200).json(producto);
    });
});

module.exports = server;