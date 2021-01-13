'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn(
      'Users',
      'isAdmin',{
        allowNull: false
      }
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn(
      'Users',
      'isAdmin',{
        allowNull: false
      }
    );
  }
};
