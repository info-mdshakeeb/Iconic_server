const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
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
    } catch (error) { console.log(error.message); }
}
mongodb()

//collection :
const Catagorys = client.db("ICONIC").collection("catagorys");
const Users = client.db("ICONIC").collection("users");
const Shops = client.db("ICONIC").collection("shops");

app.get('/user', async (req, res) => {
    const { email } = req.query
    const quary = { email: email }
    const result = await Users.find(quary).toArray()
    if (result.length) {
        res.send({ success: true, data: result })
    } else {
        res.status(404).send({ success: false, data: result })
    }
})
app.post('/users', async (req, res) => {
    const user = req.body
    const result = await Users.insertOne(user)
    res.send({ success: true, data: result })
})
app.put('/users/:email', async (req, res) => {
    const { email } = req.params;
    const updateUser = req.body;
    const filter = { email: email }
    const options = { upsert: true }
    if (updateUser.role) {
        const updateDoc = { $set: { role: 'seller', name: updateUser.name } }
        const result = await Users.updateOne(filter, updateDoc, options)
        res.send({ success: true, data: { result } })
    } else {
        const updateDoc = { $set: { role: null, name: updateUser.name } }
        const result = await Users.updateOne(filter, updateDoc, options)
        res.send({ success: true, data: { result } })
    }
})
app.get('/catagories', async (req, res) => {
    const quary = {}
    const result = await Catagorys.find(quary).toArray()
    res.send({ success: true, data: result })
})

//----------------------------------------

app.post('/shops', async (req, res) => {
    const shopDetails = req.body
    // console.log(user);
    const result = await Shops.insertOne(shopDetails)
    res.send({ success: true, data: result })

})
app.get('/shops', async (req, res) => {
    const { email } = req.query
    // console.log(email);
    const quary = { ownerEmail: email }
    // console.log(user);
    const result = await Shops.find(quary).sort({ shopCreated: -1 }).toArray()
    res.send({ success: true, data: result })
})

app.put('/shop/:id', async (req, res) => {
    const { id } = req.params;
    const update = req.body;
    console.log(update);
    const filter = { _id: ObjectId(id) }
    const options = { upsert: true }
    if (update.status == 'Unauthorised') {
        const updateDoc = { $set: { status: 'Peanding' } }
        const result = await Shops.updateOne(filter, updateDoc, options)
        res.send(result)
    }
    //  else {
    //     const updateDoc = { $set: { role: null, name: updateUser.name } }
    //     const result = await Users.updateOne(filter, updateDoc, options)
    //     res.send({ success: true, data: { result } })
    // }
})



// erroe heandel :
app.use((req, res, next) => {
    next("Url not found")
})
app.use((err, req, res, next) => {
    if (err.message) {
        res.status(500).send(err.message)
    } else if (err) {
        res.status(500).send(err)
    }
    else { res.status(500).send('there is an error') }
})
//lissen:
app.listen(port, () => console.log(process.env.PORT + " port is open"))