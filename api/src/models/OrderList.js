const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const orderList = sequelize.define("orderList", {
    price: {
      type: DataTypes.INTEGER,
    },
    quantity: {
      type: DataTypes.INTEGER,
    },
  });
};