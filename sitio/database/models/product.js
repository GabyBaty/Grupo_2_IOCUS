'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Product.belongsTo(models.Category,{
        as : 'category'
      })

      Product.belongsTo(models.Brand,{
        as : 'brand'
      })

      Product.belongsTo(models.Age,{
        as : 'age'
      })

      Product.hasMany(models.Image,{
        as : 'images',
        onDelete : 'cascade'
      })
    }
  };
  Product.init({
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    price: DataTypes.DECIMAL(8,0),
    discount: DataTypes.INTEGER,
    sku: DataTypes.STRING,
    destacado: DataTypes.BOOLEAN,
    stock: DataTypes.INTEGER,
    categoryId: DataTypes.INTEGER,
    brandId: DataTypes.INTEGER,
    ageId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};