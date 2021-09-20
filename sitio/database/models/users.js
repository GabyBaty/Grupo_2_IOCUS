'use strict';

module.exports = (sequelize, DataTypes) => {

    const users = sequelize.define('users',{
      id:{
        type:DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement:true,
        allowNulls:false
      },
      nombre: DataTypes.STRING,
      apellido: DataTypes.STRING,
      correo: DataTypes.STRING,
      password: DataTypes.STRING,
      avatar: DataTypes.STRING,
      role: DataTypes.STRING,
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE
      },
      updatedAt: {
        allowNull: false,
        type:DataTypes.DATE
      }
    },

    {
      timestamps:true
    })

    /* 
      users.associate = function(models){
            
      }
    */
    return users;

    }