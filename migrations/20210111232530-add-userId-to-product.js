'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn(
      'Products',
      'userId',{
        type: Sequelize.INTEGER,
        allowNull: true
      },
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("Products", "userId");
  }
};
