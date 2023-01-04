const { MongoClient, ServerApiVersion } = require('mongodb');
const express = require("express");
const cors = require('cors')
require('dotenv').config()
const app = express()
const port = process.env.PORT;

//middelware :
app.use(express.json())
app.use(cors())

//test:
app.get('/', (req, res) => res.send("node is open"))

//database Connect
const mongodb = () => {
    const uri = process.env.URI;
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
    try {
        client.connect()
        console.log('database connected');
    } catch (error) {
        console.log(error.message);
    }
}
mongodb()


//
app.listen(port, () => console.log(process.env.PORT + " port is open"))