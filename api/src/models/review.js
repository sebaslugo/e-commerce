const { DataTypes } = require('sequelize');



/* ------------------------------------------------------------------------------- */
/* // S53 : Crear Modelo de Reviews */
/* ------------------------------------------------------------------------------- */

module.exports = (sequelize) => {

 sequelize.define('review', {
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    rating: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 5,
    }
  })
};