'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn(
      'Products',
      'orderId',{
        type: Sequelize.INTEGER,
        allowNull: true
      },
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("Products", "orderId");
  }
};
