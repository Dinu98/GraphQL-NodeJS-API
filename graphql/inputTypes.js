const { GraphQLInputObjectType, 
        GraphQLString, 
        GraphQLNonNull, 
        GraphQLInt } = require('graphql');

const productInputType = new GraphQLInputObjectType({
  name: 'ProductInput',
  fields: {
    name: { type: GraphQLNonNull(GraphQLString)},
    image: { type: GraphQLNonNull(GraphQLString)},
    price: { type: GraphQLNonNull(GraphQLInt)},
    description: { type: GraphQLNonNull(GraphQLString)},
  }
});

const reviewInputType = new GraphQLInputObjectType({
  name: 'reviewInput',
  fields: {
    text: { type: GraphQLNonNull(GraphQLString)},
    rating: { type: GraphQLNonNull(GraphQLInt)},
  }
});

const inputTypes = {
    productInputType,
    reviewInputType
}

module.exports = inputTypes; 