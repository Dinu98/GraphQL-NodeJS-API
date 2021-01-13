const { GraphQLObjectType, 
    GraphQLInt, 
    GraphQLString, 
    GraphQLNonNull, 
    GraphQLList } = require('graphql');

const reviewType = new GraphQLObjectType({
    name: "Review",
    description: "This represents a review",
    fields: () => ({
            id: { type: GraphQLNonNull(GraphQLInt)},
            userId: { type: GraphQLNonNull(GraphQLInt)},
            text: { type: GraphQLNonNull(GraphQLString)},
            rating: { type: GraphQLNonNull(GraphQLInt)},
            createdAt: { type: GraphQLNonNull(GraphQLString)},
            updatedAt: { type: GraphQLNonNull(GraphQLString)},
            user: {
                type: userType,
                resolve: async (parent) => {
                   return await parent.getUser();
                }
            },
    })
});

const userType = new GraphQLObjectType({
    name: "User",
    description: "This represents a customer",
    fields: () => ({
        id: { type: GraphQLNonNull(GraphQLInt)},
        username: { type: GraphQLNonNull(GraphQLString)},
        email: { type: GraphQLNonNull(GraphQLString)},
        profilePicture: { type: GraphQLNonNull(GraphQLString)},
        reviews: {
            type: GraphQLList(reviewType),
            resolve: async (parent) => {
                return await parent.getReviews();
            }
        },
        orders:{
            type: GraphQLList(orderType),
            resolve: async (parent) => {
                return await parent.getOrders();
            }
        },
        productsInBasket: {
            type: GraphQLList(productType),
            resolve: async (parent) =>{
                return await parent.getProducts();
            }
        },
        createdAt: { type: GraphQLNonNull(GraphQLString)},
        updatedAt: { type: GraphQLNonNull(GraphQLString)}
    })
});

const productType = new GraphQLObjectType({
    name: "Product",
    description: "This represents a product",
    fields: () => ({
        id: { type: GraphQLNonNull(GraphQLInt)},
        name: { type: GraphQLNonNull(GraphQLString)},
        image: { type: GraphQLNonNull(GraphQLString)},
        price: { type: GraphQLNonNull(GraphQLString)},
        description: { type: GraphQLNonNull(GraphQLString)},
        users:{
            type: GraphQLList(userType),
            resolve: async (parent) => {
                return await parent.getUsers();
            }
        },
        orders:{
            type: GraphQLList(orderType),
            resolve: async (parent) => {
                return await parent.getOrders();
            }
        },
        company:{
            type: companyType,
            resolve: async (parent) => {
                return await parent.getCompany();
            }
        },
        createdAt: { type: GraphQLNonNull(GraphQLString)},
        updatedAt: { type: GraphQLNonNull(GraphQLString)}
    })
});

const orderType = new GraphQLObjectType({
    name: "Order",
    description: "This represents an order",
    fields: () => ({
        id: { type: GraphQLNonNull(GraphQLInt)},
        userId: { type: GraphQLNonNull(GraphQLInt)},
        numOfProducts: { type: GraphQLNonNull(GraphQLInt)},
        products: {
            type: GraphQLList(productType),
            resolve: async (parent) =>{
                return await parent.getProducts();
            }
        },
        company:{
            type: companyType,
            resolve: async (parent) => {
                return await parent.getCompany();
            }
        },
    })
});

const companyType = new GraphQLObjectType({
    name: "Company",
    description: "This represents a company",
    fields: () => ({
        id: { type: GraphQLNonNull(GraphQLInt)},
        email: { type: GraphQLNonNull(GraphQLString)},
        telephoneNumber: { type: GraphQLNonNull(GraphQLString)},
        address: { type: GraphQLNonNull(GraphQLString)},
        products: {
            type: GraphQLList(productType),
            resolve: async (parent) =>{
                return await parent.getProducts();
            }
        },
        orders:{
            type: GraphQLList(orderType),
            resolve: async (parent) => {
                return await parent.getOrders();
            }
        },
    })
})

const types = {
    userType,
    reviewType,
    productType,
    orderType,
    companyType
}

module.exports = types; 