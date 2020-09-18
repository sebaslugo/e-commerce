const { DataTypes } = require('sequelize');
const { User } = require('../db.js');


module.exports = (sequelize) => {

    // S31: Crear Modelo de Carrito/Orden
    
    sequelize.define('order', {
        status: {
            type: DataTypes.ENUM('creada',  'cancelada', 'completa','carrito'),
            defaultValue: 'carrito',
        },

    });


    
    
};
