'use strict';

module.exports = (sequelize, DataTypes) => {

    const images = sequelize.define('images',{
      id:{
        type:DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement:true,
        allowNulls:false
      },
      file: DataTypes.STRING,
      productsId: DataTypes.INTEGER,
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
      tableName:'images',
      timestamps:true
    })
    
      return images;

    }