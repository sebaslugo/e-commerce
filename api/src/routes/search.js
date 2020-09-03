const server = require('express').Router();
const { Product, Category, prodcat } = require('../db.js');
const Sequelize = require('sequelize');

server.get('/', (req, res) => {
    const Op = Sequelize.Op;
    console.log(req.query)
    Product.findAll({
        [Op.or]: [{
            name: { [Op.like]: '%' + req.query.query + '%' }
        }, {
            description: { [Op.like]: '%' + req.query.query + '%' }
        }]
    })
        .then((producto) => {
            res.status(200).json(producto);
        })
})

module.exports = server;