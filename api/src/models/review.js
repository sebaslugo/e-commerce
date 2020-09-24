const { DataTypes } = require("sequelize");

/* ------------------------------------------------------------------------------- */
/* // S53 : Crear Modelo de Reviews */
/* ------------------------------------------------------------------------------- */

module.exports = (sequelize) => {
  sequelize.define("review", {
    description: {
      type: DataTypes.STRING,
    },
    rating: {
      type: DataTypes.INTEGER,
      defaultValue: 5,
    },
  });
};
