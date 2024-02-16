const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('QrCode', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true,
        },
        productname: {
            type: DataTypes.STRING,
            allowNull: false
        },
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        price: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        // status: {
        //     type: DataTypes.ENUM('aceptado', 'rechazado', 'en proceso'),
        //     allowNull: false,
        //     defaultValue: 'en proceso'
        // },
        idMP: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    },
        {
            timestamps: false
        });
};