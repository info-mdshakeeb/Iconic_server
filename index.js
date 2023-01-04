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

//database Connect :
const uri = process.env.URI;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

const mongodb = () => {
    try {
        client.connect()
        console.log('database connected');
    } catch (error) {
        console.log(error.message);
    }
}
mongodb()

//collection :
const Catagorys = client.db("ICONIC").collection("catagorys");


app.get('/catagories', async (req, res) => {

    const quary = {}
    try {
        const result = await Catagorys.find(quary).toArray()
        res.send({ success: true, data: result })
    } catch (error) {
        console.log(error.name, error.message)
        res.send({
            success: false, message: error.message
        })
    }
})
//
app.listen(port, () => console.log(process.env.PORT + " port is open"))