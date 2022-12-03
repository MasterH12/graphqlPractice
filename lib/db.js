'use strict'

const { MongoClient } = require("mongodb");

const {
    DB_USER,
    DB_PASSWD,
    DB_HOST,
    DB_PORT,
    DB_NAME
} = process.env;

const mongoUrl = `mongodb+srv://${DB_USER}:${DB_PASSWD}@${DB_HOST}`
let connection;

async function connectDB (){
    if (connection) return connection;
    let client;
    try{
        client = await MongoClient.connect(mongoUrl, { 
            useNewUrlParser: true,
            //useUnifiedTopology: true,
            //serverApi: ServerApiVersion.v1 
        });
        connection = client.db(DB_NAME);
    }catch(error){
        console.log('Error en conexión de base de datos a', mongoUrl);
        console.log(error);
        process.exit(1);
    }

    return connection
}

module.exports = connectDB;