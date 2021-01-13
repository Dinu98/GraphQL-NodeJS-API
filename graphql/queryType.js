const { GraphQLObjectType, GraphQLInt, GraphQLList } = require('graphql');
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
        users: {
            type:  GraphQLList(types.userType),
            description: "Returns all users",
            resolve: async () => {
                return await models.User.findAll();
            }
        },
        reviews: {
            type:  GraphQLList(types.reviewType),
            description: "Returns all reviews",
            resolve: async () => {
                return await models.Review.findAll();
            }
        },
        products: {
            type:  GraphQLList(types.productType),
            description: "Returns all products",
            resolve: async () => {
                return await models.Product.findAll();
            }
        },
        currentUser: {
            type: types.userType,
            description: "Returns current user",
            resolve: (parent, args, context) => {
                const { user } = context;
            
                return user;
            }
        },
        currentCompany: {
            type: types.companyType,
            description: "Return current company",
            resolve: (parent, args, context) => {
                const { company } = context;

                return company;
            }
        }
	})
});

  module.exports = queryType; 