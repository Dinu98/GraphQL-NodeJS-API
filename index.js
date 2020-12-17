const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const app = express();


const schema = require('./graphql/index');

app.use("/graphql", graphqlHTTP({
    schema,
    graphiql: true
}));

app.listen(3000, () => {
    console.log("Server started");
}); 