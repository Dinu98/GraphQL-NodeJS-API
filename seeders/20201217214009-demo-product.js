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
   const mockProducts = new Array(10).fill().map(() => ({
    name: faker.commerce.productName(),
    price: parseInt(faker.commerce.price()),
    image: faker.image.imageUrl(),
    description: faker.commerce.productDescription(),
    createdAt: new Date(),
    updatedAt: new Date(),
  }));

   await queryInterface.bulkInsert('Products', mockProducts, {});  
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Products', null, {});
  }
};
