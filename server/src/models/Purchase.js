const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('Purchase', {
    id: {
      type: DataTypes.INTEGER,
      autoincrement: true,
      allowNull: false,
      primaryKey: true
    },
    dateTime: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    },
    paymentId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    transaction: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    }
  });
};