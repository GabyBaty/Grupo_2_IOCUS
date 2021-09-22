'use strict';

const productos = require('../../src/data/products.json');
const images = [];

productos.forEach((producto,index) => {
  producto.images.forEach(image => {
    var img = {
      file : image,
      productId : index + 1,
      createdAt : new Date,
      updatedAt : new Date
    }
    images.push(img)
  });
 
})

module.exports = {
  up: async (queryInterface, Sequelize) => {
  
     await queryInterface.bulkInsert('Images',images, {});
   
  },

  down: async (queryInterface, Sequelize) => {
   
     await queryInterface.bulkDelete('Images', null, {});
     
  }
};
