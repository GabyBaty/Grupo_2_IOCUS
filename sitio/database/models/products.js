
'use strict';

module.exports = (sequelize, DataTypes) => {

    const products = sequelize.define('products',{
      id:{
        type:DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement:true,
        allowNulls:false
      },
      name: DataTypes.STRING,
      description: DataTypes.STRING,
      price: DataTypes.DECIMAL,
      discount: DataTypes.INTEGER,
      sku: DataTypes.STRING,
      destacado: DataTypes.BOOLEAN,
      stock: DataTypes.INTEGER,
      brandsId: DataTypes.INTEGER,
      agesId: DataTypes.INTEGER,
      categoriesId: DataTypes.INTEGER,
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
      tableName:'products',
      timestamps:true
    })

    
      products.associate = function(models){
        products.belongsTo(models.categories, {
          as: "categories",
          foreignKey: "categoriesId"
        });  
        products.hasMany(models.images, {
          as:"images",
          foreignKey: "productsId"
      })  
      }
  
    
    return products;

    }