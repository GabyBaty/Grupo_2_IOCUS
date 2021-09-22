'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
 
     await queryInterface.bulkInsert('ages', [
     
        {
          name:"0 a 24 meses",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name:"2 a 4 años",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name:"5 a 7 años",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name:"8 a 13 años",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name:"14 años y mayores",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
    ], {});

  },

  down: async (queryInterface, Sequelize) => {
   
     await queryInterface.bulkDelete('ages', null, {});
     
  }
};
