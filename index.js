const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const app = express();
const schema = require('./graphql/index');
const database = require('./database');


if(process.env.NODE_ENV === 'production') 
    database.connect();

app.use("/graphql", graphqlHTTP({
    schema,
    graphiql: true
}));

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log("Server started");
}); 