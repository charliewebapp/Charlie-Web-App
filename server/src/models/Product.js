const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "Product",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      brand: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      image: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      price: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      stock: {
        type: DataTypes.ENUM("available", "notavailable"),
        defaultValue: "available",
        allowNull: false,
      },
      category: {
        type: DataTypes.ENUM(
          "Tragos",
          "Cervezas",
          "Botellas",
          "Vinos",
          "Shots",
          "Sin Alcohol"
        ),
        allowNull: false,
      },
    },
    {
      timestamps: false,
    }
  );
};
