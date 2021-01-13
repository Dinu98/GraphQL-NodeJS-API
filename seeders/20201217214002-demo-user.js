'use strict';
const faker = require('faker');
const config = require('../config/appConfig');
const bcrypt = require('bcrypt');

module.exports = {
  up: async (queryInterface, Sequelize) => {

   const hashedPassword = await bcrypt.hash('Parola', config.SALT_ROUNDS);

   const mockUsers = new Array(10).fill().map(() => ({
    username:faker.internet.userName(),
    email: faker.internet.email(),
    password: hashedPassword,
    profilePicture: faker.image.imageUrl(),
    isAdmin: false,
    createdAt: new Date(),
    updatedAt: new Date(),
   }));

   mockUsers.push({
    username:faker.internet.userName(),
    email: faker.internet.email(),
    password: hashedPassword,
    profilePicture: faker.image.imageUrl(),
    isAdmin: true,
    createdAt: new Date(),
    updatedAt: new Date(),});

   await queryInterface.bulkInsert('Users', mockUsers, {});  
  },

  down: async (queryInterface, Sequelize) => {

    await queryInterface.bulkDelete('Users', null, {});
  }
};
