'use strict';

module.exports = (sequelize, DataTypes) => {

    const categories = sequelize.define('categories',{
      id:{
        type:DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement:true,
        allowNulls:false
      },
      name: DataTypes.STRING,
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
      tableName:'categories',
      timestamps:true
    })

    
     categories.associate = function(models){
              categories.hasMany(models.products,{
                as:'products',
                foreignKey:'categoriesId'
              })
      }
    
      return categories;

    }