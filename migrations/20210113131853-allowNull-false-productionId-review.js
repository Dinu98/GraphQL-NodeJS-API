'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn(
      'Reviews',
      'productId',{
        type: Sequelize.INTEGER,
        allowNull: false
      }
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn(
      'Reviews',
      'productId',{
        type: Sequelize.INTEGER,
        allowNull: true
      }
    );
  }
};
