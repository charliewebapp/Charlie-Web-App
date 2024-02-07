const { DataTypes } = require('sequelize');
module.exports = (sequelize) => {

  sequelize.define('Collaborator', {
    id:{
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password:{
      type: DataTypes.STRING,
      allowNull: false,
    },
    mail:{
      type: DataTypes.STRING,
      allowNull: false,
    },
    status:{
      type: DataTypes.ENUM('active','inactive'),
      defaultValue: 'active',
      allowNull: false, 
    }
  },
  {
    timestamps: false
  }
  );
};