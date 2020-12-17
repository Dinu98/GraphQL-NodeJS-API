const { GraphQLObjectType, GraphQLInt } = require('graphql');
const types = require('./types')
const models = require('../models');

const queryType = new GraphQLObjectType({
    name: 'RootQuery',
    fields: () => ({
        user: {
            type: types.userType,
            description: "Return a specific user",
            args: {
                id: { type: GraphQLInt }
            },
            resolve: async (parent,args) => {
                return await models.User.findByPk(args.id);
            }
        },
        review: {
            type: types.reviewType,
            description: "Return a specific review",
            args: {
                id: { type: GraphQLInt }
            },
            resolve: async (parent,args) => {
                return await models.Review.findByPk(args.id);
            }
        },
        product: {
            type: types.productType,
            description: "Return a specific product",
            args: {
                id: { type: GraphQLInt }
            },
            resolve: async (parent,args) => {
                return await models.Product.findByPk(args.id);
            }
        },

	})
});

  module.exports = queryType; 