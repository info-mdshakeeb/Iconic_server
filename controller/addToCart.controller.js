const { getDb } = require("../utilities/mongodb");

module.exports.getAddTwoCartByUser = async (req, res) => {
    const db = getDb();
    const cardItems = db.collection("CardItems");
    const { email } = req.query;
    try {
        const result = await cardItems.find({ userEmail: email }).toArray();
        if (result) {
            res.status(200).send({ success: true, data: result });
        } else {
            res.status(404).send({ success: false, data: result });
        }
    } catch (error) {
        res.status(500).send({ error });
    }
}
module.exports.addAddTwoCartByUser = async (req, res) => {
    const db = getDb();
    const cardItems = db.collection("CardItems");
    const cartData = req.body;
    try {
        const result = await cardItems.insertOne(cartData);
        if (result) {
            res.status(201).send({ success: true, data: result });
        } else {
            res.status(404).send({ success: false, data: result });
        }
    } catch (error) {
        res.status(500).send({ error });
    }
}
module.exports.updateAddTwoCartByUser = async (req, res) => {
    const db = getDb();
    const cardItems = db.collection("CardItems");
    const { id } = req.query;
    const filter = { id: id }
    const options = { upsert: true }
    const cartData = req.body;

    try {
        const common = await cardItems.find({ id: id }).toArray();

        const updateDoc = { $set: { amount: common[0].amount + cartData.amount } }
        const result = await cardItems.updateOne(filter, updateDoc, options);
        if (result) {
            res.status(201).send({ success: true, data: result });
        } else {
            res.status(404).send({ success: false, data: result });
        }
    } catch (error) {
        res.status(500).send({ error });
    }
}
//DELETE 
module.exports.deleteAddTwoCartByUser = async (req, res) => {
    const db = getDb();
    const cardItems = db.collection("CardItems");
    const { id } = req.query;
    const filter = { id: id }
    try {
        const result = await cardItems.deleteOne(filter);
        if (result) {
            res.status(201).send({ success: true, data: result });
        } else {
            res.status(404).send({ success: false, data: result });
        }
    }
    catch (error) {
        res.status(500).send({ error });
    }
}