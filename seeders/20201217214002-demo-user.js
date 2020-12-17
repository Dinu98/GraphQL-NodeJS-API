'use strict';
const faker = require('faker');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
   const mockUsers = new Array(10).fill().map(() => ({
    username:faker.internet.userName(),
     email: faker.internet.email(),
     profilePicture: faker.image.imageUrl(),
     createdAt: new Date(),
     updatedAt: new Date(),
   }));

   await queryInterface.bulkInsert('Users', mockUsers, {});  
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Users', null, {});
  }
};
