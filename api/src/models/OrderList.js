const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("orderList", {
    price: {
      type: DataTypes.INTEGER,
      validate:{
        isNumeric:true
      },
    },
    quantity: {
      type: DataTypes.INTEGER,
      validate:{
        isNumeric:true
      },
    },
  });
};