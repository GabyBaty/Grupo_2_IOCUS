'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Products', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.STRING(500)
      },
      price: {
        type: Sequelize.DECIMAL(8,0)
      },
      discount: {
        type: Sequelize.INTEGER
      },
      sku: {
        type: Sequelize.STRING
      },
      destacado: {
        type: Sequelize.BOOLEAN
      },
      stock: {
        type: Sequelize.INTEGER
      },
      categoryId: {
        type: Sequelize.INTEGER,
        references : {
          model : {
            tableName : 'Categories'
          },
          key : 'id'
        }
      },
      brandId: {
        type: Sequelize.INTEGER,
        references : {
          model : {
            tableName : 'Brands'
          },
          key : 'id'
        }
      },
      ageId: {
        type: Sequelize.INTEGER,
        references : {
          model : {
            tableName : 'Ages'
          },
          key : 'id',
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Products');
  }
};