const { GraphQLObjectType, GraphQLNonNull, GraphQLInt, GraphQLString } = require('graphql');
const models = require('../models');
const types = require('./types');
const config = require('../config/appConfig');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const mutationType = new GraphQLObjectType({
    name: 'RootMutation',
    fields: {
        createProduct:{
            type: types.productType,
            description: "Creates a product",
            args:{
                name: { type: GraphQLNonNull(GraphQLString)},
                price: { type: GraphQLNonNull(GraphQLInt)},
                image: { type: GraphQLNonNull(GraphQLString)},
                description: { type: GraphQLNonNull(GraphQLString)},
            },
            resolve: async (parent, productData) => {

                const post = await models.Product.create(productData)

                return post;
            }
        },
        login: {
            type: GraphQLString,
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
        }
    }
  });

  module.exports = mutationType;
