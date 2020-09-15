const { DataTypes } = require("sequelize");

/* ------------------------------------------------------------------------------- */
/* // S53 : Crear Modelo de Reviews */
/* ------------------------------------------------------------------------------- */

module.exports = (sequelize) => {
  sequelize.define("review", {
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    rating: {
      type: DataTypes.ENUM("1", "2", "3", "4", "5"),
      allowNull: false,
      defaultValue: "5",
    },
    likes: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
  });
};
