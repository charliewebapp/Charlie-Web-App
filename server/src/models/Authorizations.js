const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "Authorizations",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      access_token: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      expires_in: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      live_mode: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      public_key: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      refresh_token: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      scope: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      token_type: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      dateTime: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      }
    },
    { timestamps: false }
  );
};

