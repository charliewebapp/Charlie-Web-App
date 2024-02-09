const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('QrCode', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true,
        },
        products: {
            type: DataTypes.ARRAY(DataTypes.JSON),
            allowNull: false
        },
        totalPrice: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        status: {
            type: DataTypes.ENUM('aceptar', 'rechazar', 'en proceso'),
            allowNull: false,
            defaultValue: 'en proceso'
        },
        idMercadoPago: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    },
    {
        timestamps: false
    });
};