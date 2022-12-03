'use strict'
require('dotenv').config()
const http = require('http')
const { makeExecutableSchema } = require('@graphql-tools/schema')
const { graphqlHTTP } = require ('express-graphql')
const express = require('express')
const { readFileSync } = require('fs');
const { join } = require('path')

const resolvers = require('./lib/resolvers')
const app = express()
const PORT = process.env.PORT || 3000

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
    graphiql: true
})

// Express server
app.use('/api', handlerObject)

app.listen({ port: PORT })
console.log(`Server is listening at http://localhost:${PORT}/api`)
