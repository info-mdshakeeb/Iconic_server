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
const Users = client.db("ICONIC").collection("users");
const Shops = client.db("ICONIC").collection("shops");

app.get('/user', async (req, res) => {
    const { email } = req.query
    // console.log(email);
    const quary = { email: email }
    try {
        const result = await Users.find(quary).toArray()
        res.send({ success: true, data: result })
    } catch (error) {
        console.log(error.name, error.message)
        res.send({ success: false, message: error.message })
    }
})
app.post('/users', async (req, res) => {
    const user = req.body
    // console.log(user);
    try {
        const result = await Users.insertOne(user)
        res.send({ success: true, data: result })
    } catch (error) {
        console.log(error.name, error.message)
        res.send({ success: false, message: error.message })
    }
})
app.put('/users/:email', async (req, res) => {
    const { email } = req.params;
    const updateUser = req.body;
    const filter = { email: email }
    const options = { upsert: true }
    if (updateUser.role) {
        const updateDoc = { $set: { role: 'seller', name: updateUser.name } }
        try {
            const result = await Users.updateOne(filter, updateDoc, options)
            res.send({ success: true, data: { result } })
        } catch (error) {
            console.log(error.name, error.message)
            res.send({ success: false, message: error.message })
        }
    } else {
        const updateDoc = { $set: { role: null, name: updateUser.name } }
        try {
            const result = await Users.updateOne(filter, updateDoc, options)
            res.send({ success: true, data: { result } })
        } catch (error) {
            console.log(error.name, error.message)
            res.send({ success: false, message: error.message })
        }
    }
})
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

//----------------------------------------

app.post('/shops', async (req, res) => {
    const shopDetails = req.body
    // console.log(user);
    try {
        const result = await Shops.insertOne(shopDetails)
        res.send({ success: true, data: result })
    } catch (error) {
        console.log(error.name, error.message)
        res.send({ success: false, message: error.message })
    }
})
app.get('/shops', async (req, res) => {
    const { email } = req.query
    // console.log(email);
    const quary = { ownerEmail: email }
    // console.log(user);
    try {
        const result = await Shops.find(quary).toArray()
        res.send({ success: true, data: result })
    } catch (error) {
        console.log(error.name, error.message)
        res.send({ success: false, message: error.message })
    }
})




//
app.listen(port, () => console.log(process.env.PORT + " port is open"))