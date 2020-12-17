const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const app = express();
const schema = require('./graphql/index');

if(process.env.NODE_ENV === 'production') {

    const { Client } = require('pg');

    const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
    });

    client.connect();

}

app.use("/graphql", graphqlHTTP({
    schema,
    graphiql: true
}));

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log("Server started");
}); 