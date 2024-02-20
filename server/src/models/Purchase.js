const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define("Purchase", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    paymentId: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    dateTime: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    amount: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    cart : {
      type: DataTypes.ARRAY(DataTypes.JSON),
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM("approved", "rejected", "pending"),
      defaultValue: "pending",
      allowNull: false,
    },
  },
  {
      timestamps: false
  });
};

/*

id

payment_id
amount:
status:

fk qrcode
fk user
fk client

*/
