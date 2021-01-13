'use strict';
const faker = require('faker');
const config = require('../config/appConfig');
const bcrypt = require('bcrypt');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const hashedPassword = await bcrypt.hash('Parola', config.SALT_ROUNDS);

    const mockCompanies = new Array(10).fill().map(() => ({
     name:faker.company.companyName(),
     email: faker.internet.email(),
     password: hashedPassword,
     address: faker.address.streetAddress(),
     telephoneNumber: faker.phone.phoneNumber(),
     createdAt: new Date(),
     updatedAt: new Date(),
  }));

  const mockUsersProducts = new Array(10).fill().map(() => ({
    UserId: (faker.random.number() % 10) + 1,
    ProductId: (faker.random.number() % 10) + 1,
    createdAt: new Date(),
    updatedAt: new Date(),
  }));

  const mockOrdersProducts = new Array(10).fill().map(() => ({
    OrderId: (faker.random.number() % 10) + 1,
    ProductId: (faker.random.number() % 10) + 1,
    createdAt: new Date(),
    updatedAt: new Date(),
  }));

    await queryInterface.bulkInsert('Companies', mockCompanies, {});
    await queryInterface.bulkInsert('UsersProducts', mockUsersProducts, {});
    await queryInterface.bulkInsert('OrdersProducts', mockOrdersProducts, {});
},

  down: async (queryInterface, Sequelize) => {

    await queryInterface.bulkDelete('Companies', null, {});
    await queryInterface.bulkDelete('UsersProducts', null, {});
    await queryInterface.bulkInsert('OrdersProducts', null, {});
  }
};
