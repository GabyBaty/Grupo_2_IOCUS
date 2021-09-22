'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
 
     await queryInterface.bulkInsert('brands', [
     
        {
          name:"Hasbro",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name:"Marvel",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name:"Disney",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name:"Mattel",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name:"Lego",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name:"Playmates",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
    ], {});

  },

  down: async (queryInterface, Sequelize) => {
   
     await queryInterface.bulkDelete('brands', null, {});
     
  }
};
