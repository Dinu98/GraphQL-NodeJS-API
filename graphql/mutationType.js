const { GraphQLObjectType, GraphQLNonNull, GraphQLInt, GraphQLString } = require('graphql');
const models = require('../models');
const types = require('./types');

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
        }
    }
  });

  module.exports = mutationType;
