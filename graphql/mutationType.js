const { GraphQLObjectType, GraphQLNonNull, GraphQLInt, GraphQLString, GraphQLBoolean } = require('graphql');
const models = require('../models');
const types = require('./types');
const config = require('../config/appConfig');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const inputTypes = require('./inputTypes');
const { userType } = require('./types');


const mutationType = new GraphQLObjectType({
    name: 'RootMutation',
    fields: {
        createProduct:{
            type: types.productType,
            description: "Creates a product",
            args:{
              productInput: {
                type: GraphQLNonNull(inputTypes.productInputType)
              },
            },
            resolve: async (parent, {productInput}) => {
                const post = await models.Product.create(productInput)

                return post;
            }
        },
        editProduct:{
          type: types.productType,
          description: "Edit a product",
          args:{
              id: { type: GraphQLNonNull(GraphQLInt)},
              productInput: {
                type: GraphQLNonNull(inputTypes.productInputType)
              },
          },
          resolve: async (parent, { id, productInput }, context) => 
          {
              const product = await models.Product.findByPk(id);

              if(!product){
                return null;
              }

              await product.update(productInput)

              return product;
          }
        },
        addProductToBasket:{
          type: types.productType,
          description: "Add a product to the current user basket",
          args:{
            id: {type: GraphQLNonNull(GraphQLInt)}
          },
          resolve: async (parent, {id}, context) => {
            const product = await models.Product.findByPk(id);
            const {user} = context;

            if(!product || !user ){
              return null
            }

            await user.addProduct(product);

            return product;
          }
        },
        removeProductFromBasket:{
          type: GraphQLBoolean,
          description: "Remove a product from the current user basket",
          args:{
            id: {type: GraphQLNonNull(GraphQLInt)}
          },
          resolve: async (parent, {id}, context) => {
            const product = await models.Product.findByPk(id);
            const {user} = context;

            if(!product || !user){
              return null;
            }

            await user.removeProduct(product);

            return true;
          }
        },
        placeOrder:{
          type: types.orderType,
          description: "Places an order with the products in the basket",
          resolve: async (parent, data, context) => {
            const { user } = context;

            if(!user){
              return null;
            }

            const { id } = user;

            const products = await user.getProducts();
            const count = products.length;

            const orderData = {userId: id, numOfProducts: count};
            const order = await models.Order.create(orderData);

            for(let product of products){
              await product.addOrder(order);
              await user.removeProduct(product);
            }

            return order;
          }
        },
        createReview:{
          type: types.reviewType,
          description: "Creates a review",
          args:{
            reviewInput: {
              type: GraphQLNonNull(inputTypes.reviewInputType)
            },
          },
          resolve: async (parent, {reviewInput}, context) => {
              const { user } = context;

              if(!user){
                return null;
              }
              
              reviewInput.userId = user.id;
              const review = await models.Review.create(reviewInput)

              return review;
          }
        },
        editReview:{
          type: types.reviewType,
          description: "Edit a review",
          args:{
            id: { type: GraphQLNonNull(GraphQLInt)},
            reviewInput: {
              type: GraphQLNonNull(inputTypes.reviewInputType)
            },
          },
          resolve: async (parent, { id, reviewInput }, context) => {
              const { user } = context;
              const review = await models.Review.findByPk(id);

              if(!user || user.id !== review.userId || !review){
                return null;
              }

              await review.update(reviewInput);

              return review;
          }
        },
        deleteReview:{
          type: GraphQLBoolean,
          description: "Delete a review",
          args:{
            id: { type: GraphQLNonNull(GraphQLInt)},
          },
          resolve: async (parent, { id }, context) => {
            const { user } = context;
            const review = await models.Review.findByPk(id);

            console.log(user);
            console.log(review);

            if(!user || !review || user.id !== review.userId){
              return null;
            }

            await review.destroy();

            return true;
          }
        },
        login: {
            type: GraphQLString,
            description: "User login",
            args: {
              email: {
                type: GraphQLNonNull(GraphQLString),
              },
              password: {
                type: GraphQLNonNull(GraphQLString),
              },
            },
            resolve: async (parent, { email, password }) => {
              const user = await models.User.findOne({
                where: {
                  email,
                }
              });

              if(user) {
                const isValid = await bcrypt.compare(password, user.password);

                if(isValid) {
                  const token = jwt.sign({userId: user.id}, config.JWTSECRET);

                  return token;
                }
              }
      
              return null;
            }
        },
        register:{
          type: GraphQLString,
          description: "User registration",
          args:{
            email: {
              type: GraphQLNonNull(GraphQLString),
            },
            password: {
              type: GraphQLNonNull(GraphQLString),
            },
          },
          resolve: async (parent, userData) => {

            const potentialUserInDb = await models.User.findOne({
              where:{
                email: userData.email
              }
            });

            if(!potentialUserInDb){

              const hashedPassword = await bcrypt.hash(userData.password, config.SALT_ROUNDS);
              userData.password = hashedPassword;
              const user = await models.User.create(userData);
  
              const token = jwt.sign({userId: user.id}, config.JWTSECRET);
  
              return token;
            }

            return null;
          }
        },
    }
  });

  module.exports = mutationType;
