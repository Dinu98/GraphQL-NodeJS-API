'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn(
      'Reviews',
      'productId',{
        allowNull: false
      }
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn(
      'Reviews',
      'productId',{
        allowNull: true
      }
    );
  }
};
