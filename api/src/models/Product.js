// S4: Crear Modelo de Productos
const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('product', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false
    },
    price: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: false,
      defaultValue: 0
    },
    stock: {
      type: DataTypes.INTEGER,
      
    },
    image: {
      type: DataTypes.STRING, // la imagen recibiria una url con la ubicación del archivo
      allowNull: false
    },
    imagenes:{
      type:DataTypes.VIRTUAL,
      get(){
        return this.image.split(',');
      }
    }
  });
};