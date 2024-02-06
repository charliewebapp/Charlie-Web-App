const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "Category",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      name: {
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
