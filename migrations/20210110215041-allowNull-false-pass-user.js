'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn(
      'Users',
      'password',{
        allowNull: false
      }
    )
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn(
      'Users',
      'password',{
        allowNull: true
      }
    )
  }
};
