'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Company extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.Company.hasMany(models.Product, { foreignKey: 'companyId' });
      models.Company.hasMany(models.Order, {foreignKey: "companyId"});
    }
  };
  Company.init({
    name: DataTypes.STRING,
    password: DataTypes.STRING,
    email: DataTypes.STRING,
    address: DataTypes.STRING,
    telephoneNumber: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Company',
  });
  return Company;
};