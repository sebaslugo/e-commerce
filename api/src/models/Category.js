/* ------------------------------------------------------------------------------- */
/* S5: Crear Modelo de Categorias */
/* ------------------------------------------------------------------------------- */
const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("category", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
    },
  });
};
