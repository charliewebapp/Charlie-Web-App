const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('PurchaseHistory', {
    id: {
      type: DataTypes.INTEGER,
      autoincrement: true,
      allowNull: false,
      primaryKey: true
    },   
    totalPrice: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  });
};