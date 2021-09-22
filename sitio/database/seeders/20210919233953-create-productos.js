'use strict';
const productos = require('../../src/data/products.json');

const products = productos.map(product => {
  let item = {
    sku: product.sku,
    name: product.name,
    categoryId: product.categoryId,
    brandId: product.brandId,
    ageId:product.ageId,
    description: product.description,
    price: product.price,
    discount: product.discount,
    stock: product.stock,
    destacado: product.destacado,
    createdAt : new Date,
    updatedAt : new Date
  }
  return item
})

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('products', products)
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('products', null,{});
  }
};
