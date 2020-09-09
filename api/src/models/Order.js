const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {

    // S31: Crear Modelo de Carrito/Orden
    
    const Order = sequelize.define('order', {
        status: {
            type: DataTypes.ENUM('creada', 'procesando', 'cancelada', 'completa'),
            defaultValue: 'procesando',
        },
        total: {
            type: DataTypes.DECIMAL,
            validate:{isDecimal: true},
            allownull: false
        }

    });

};