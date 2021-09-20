'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
 
     await queryInterface.bulkInsert('categories', [
       {
         name:"Vehiculos",
         createdAt: new Date(),
         updatedAt: new Date(),
       },
        {
          name:"Rompecabezas",
          createdAt: new Date(),
          updatedAt: new Date(),
        }
    ], {});

  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
