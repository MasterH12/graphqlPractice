'use strict'
require('dotenv').config()
const http = require('http')
const cors = require('cors');
const { makeExecutableSchema } = require('@graphql-tools/schema')
const { graphqlHTTP } = require ('express-graphql')
const express = require('express')
const { readFileSync } = require('fs');
const { join } = require('path')

const resolvers = require('./lib/resolvers')
const app = express()
const PORT = process.env.PORT || 3000

const isDev = process.env.NODE_ENV !== "production"

// define initial schema
const typeDefs = readFileSync(
    join(__dirname, 'lib', 'schema.graphql'),
    'utf-8'
);
const schema = makeExecutableSchema({typeDefs, resolvers});

// Execute the hello query
/*
graphql({
    schema: schema,
    source: "{ saludo }",
    rootValue: resolvers
}).then((data) => {
    console.log(data)
});
*/

// server graphqlObject
const handlerObject = graphqlHTTP({
    schema: schema,
    graphiql: isDev
})

// Express server
app.use(cors());
app.use('/api', handlerObject)

app.listen({ port: PORT })
console.log(`Server is listening at http://localhost:${PORT}/api`)
