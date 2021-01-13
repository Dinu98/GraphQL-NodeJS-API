'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.Product.belongsToMany(models.User, { through: 'UsersProducts' });
      models.Product.belongsToMany(models.Order, {through: 'OrdersProducts' });
      models.Product.belongsTo(models.Company, {foreignKey: 'companyId'});
      models.Product.hasMany(models.Review, {foreignKey: 'productId'});
    }
  };
  Product.init({
    name: DataTypes.STRING,
    companyId: DataTypes.STRING,
    price: DataTypes.NUMBER,
    image: DataTypes.STRING,
    description: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};