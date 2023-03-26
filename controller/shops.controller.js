const { getDb } = require("../utilities/mongodb")
const ObjectId = require('mongodb').ObjectID;

module.exports.shops = async (req, res) => {
    const db = getDb();
    const Shops = db.collection("shops");
    const query = {}
    try {
        const result = await Shops.find(query).toArray()
        if (result.length) {
            res.send({ success: true, data: result })
        } else {
            res.status(404).send({ success: false, data: result })
        }
    } catch (error) {
        res.status(500).send({ success: false, data: error })
    }
}

module.exports.shop = async (req, res) => {
    const db = getDb();
    const Shops = db.collection("shops");
    const { email } = req.params;
    const query = { ownerEmail: email }
    try {
        const result = await Shops.find(query).toArray()
        if (result.length) {
            res.send({ success: true, data: result })
        } else {
            res.status(404).send({ success: false, data: result })
        }
    } catch (error) {
        res.status(500).send({ success: false, data: error })
    }
}

module.exports.addShop = async (req, res) => {
    const db = getDb();
    const Shops = db.collection("shops");
    const shopDetails = req.body;
    try {
        const result = await Shops.insertOne(shopDetails)
        res.status(201).send({ success: true, data: result })
    } catch (error) {
        res.status(500).send({ success: false, data: error })
    }
}

module.exports.updateShop = async (req, res) => {
    const db = getDb();
    const Shops = db.collection("shops");
    const { id } = req.params;
    const updateShop = req.body;
    const filter = { _id: ObjectId(id) }
    const options = { upsert: true }
    try {
        const updateDoc = { $set: { status: updateShop.status } }
        const result = await Shops.updateOne(filter, updateDoc, options)
        res.status(200).send({ success: true, data: result })
    } catch (error) {
        res.status(500).send({ success: false, data: error })
    }
}