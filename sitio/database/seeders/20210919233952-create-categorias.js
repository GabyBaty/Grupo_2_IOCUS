'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
 
     await queryInterface.bulkInsert('categories', [
     
        {
          name:"Difraces",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name:"Figuras de acción",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name:"Juegos de mesa",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name:"Vehiculos",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
    ], {});

  },

  down: async (queryInterface, Sequelize) => {
   
     await queryInterface.bulkDelete('categories', null, {});
     
  }
};
