const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("orderList", {
    price: {
      type: DataTypes.INTEGER,
    },
    quantity: {
      type: DataTypes.INTEGER,
    },
  });
};