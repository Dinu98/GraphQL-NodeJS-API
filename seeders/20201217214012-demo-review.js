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
   const mockReviews = new Array(10).fill().map(() => ({
    userId: faker.random.number() % 10,
    productId: faker.random.number() % 10,
    text: faker.lorem.sentence(),
    rating: faker.random.number() % 6,
    createdAt: new Date(),
    updatedAt: new Date(),
    }));

  await queryInterface.bulkInsert('Reviews', mockReviews, {});  
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Reviews', null, {});
  }
};
