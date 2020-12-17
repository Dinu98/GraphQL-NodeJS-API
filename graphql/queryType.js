const { GraphQLObjectType, GraphQLNonNull, GraphQLInt, GraphQLString } = require('graphql');

const queryType = new GraphQLObjectType({
    name: 'HelloWorld',
    fields: () => ({
        message: {
            type: GraphQLString,
            resolve: () => 'Hello World'
        }
    })
  });

  module.exports = queryType; 