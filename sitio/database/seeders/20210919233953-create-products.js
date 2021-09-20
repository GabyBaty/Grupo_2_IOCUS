'use strict';


module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('products',[
  
      {
      
    name: "Figura Kakashi Hatake",
    description: "DESCRIPCIÓN DEL PRODUCTO product description DESCRIPCIÓN DEL PRODUCTO product description",
    price: 5000,
    discount: 50,
    sku: "FAC001",
    destacado: true,
    stock: 20,
    brandsId:1,
    agesId:1,
    categoriesId:1,
    createdAt: new Date(),
    updatedAt: new Date(),
   
},

{
  name: "Figura Kakashi Hatake",
  description: "DESCRIPCIÓN DEL PRODUCTO product description DESCRIPCIÓN DEL PRODUCTO product description",
  price: 5000,
  discount: 50,
  sku: "FAC001",
  destacado: true,
  stock: 20,
  brandsId:1,
  agesId:1,
  categoriesId:2,
  createdAt: new Date(),
  updatedAt: new Date(),
 

},

])
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('products', null,{});
  }
};
