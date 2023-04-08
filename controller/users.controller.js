const { getDb } = require("../utilities/mongodb")
const ObjectId = require('mongodb').ObjectID;


module.exports.user = async (req, res) => {
    const db = getDb();
    const Users = db.collection("users");
    const { email } = req.query;
    const result = await Users.find({ email: email }).toArray();
    try {
        if (result.length) {
            res.status(200).send({ success: true, data: result })
        } else {
            res.status(404).send({ success: false, data: result })
        }
    } catch (error) {
        res.status(500).send({ success: false, error: error.message })
    }
}

module.exports.postUser = async (req, res) => {
    const db = getDb();
    const Users = db.collection("users");
    try {
        const user = req.body;
        const result = await Users.insertOne(user);
        res.send({ success: true, data: result })
    } catch (error) {
        res.status(500).send({ success: false, error: error.message })
    }
}

module.exports.updateUser = async (req, res) => {
    const db = getDb();
    const Users = db.collection("users");
    const { email } = req.query;
    const updateUser = req.body;
    const filter = { email: email }
    const options = { upsert: true }
    try {
        if (updateUser.role) {
            const updateDoc = { $set: { role: 'seller', name: updateUser.name } }
            const result = await Users.updateOne(filter, updateDoc, options)
            res.send({ success: true, data: { result } })
        } else {
            const updateDoc = { $set: { role: null, name: updateUser.name } }
            const result = await Users.updateOne(filter, updateDoc, options)
            res.send({ success: true, data: { result } })
        }
    } catch (error) {
        res.status(500).send({ success: false, error: error.message })
    }



}

module.exports.getAddress = async (req, res) => {
    const db = getDb();
    const UsersAddress = db.collection("usersAddress");
    const { email } = req.query;
    const query = { userEmail: email }
    try {
        const result = await UsersAddress.find(query).toArray();
        if (result.length) {
            res.status(200).send({ success: true, data: result })
        }
        else { res.status(404).send({ success: false, data: result }) }
    } catch (error) { res.status(500).send({ success: false, error: error.message }) }
}
module.exports.postAddress = async (req, res) => {
    const db = getDb();
    const UsersAddress = db.collection("usersAddress");
    const address = req.body;
    try {
        const result = await UsersAddress.insertOne(address);
        if (result) {
            res.status(201).send({ success: true, data: result })
        } else {
            res.status(404).send({ success: false, data: result })
        }
    } catch (error) {
        res.status(500).send({ success: false, error: error.message })
    }
}
module.exports.deleteAddress = async (req, res) => {
    const db = getDb();
    const UsersAddress = db.collection("usersAddress");
    const { id } = req.query;
    const query = { _id: ObjectId(id) }
    try {
        const result = await UsersAddress.deleteOne(query);
        if (result) {
            res.status(200).send({ success: true, data: result })
        } else {
            res.status(404).send({ success: false, data: result })
        }
    } catch (error) {
        res.status(500).send({ success: false, error: error.message })
    }
}