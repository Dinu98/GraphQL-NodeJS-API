'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn(
      'Reviews',
      'productId',{
        type: Sequelize.INTEGER,
        allowNull: true
      },
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("Reviews", "productId");
  }
};
