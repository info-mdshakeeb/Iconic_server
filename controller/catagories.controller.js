const { getDb } = require("../utilities/mongodb");
const ObjectId = require('mongodb').ObjectID;

module.exports.catagories = async (req, res) => {
    const db = getDb();
    const Catagories = db.collection("catagorys");
    const result = await Catagories.find({}).toArray();
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
module.exports.categoryWise = async (req, res) => {
    const db = getDb();
    const Shops = db.collection("shops");
    const Catagories = db.collection("catagorys");
    //find category by id:
    const { id } = req.params;
    const category = await Catagories.findOne({ _id: ObjectId(id) });
    //get all verified shops by category:
    const query = { status: "verified", category: category.name };
    try {
        const result = await Shops.find(query).toArray()
        if (result.length) {
            res.status(200).send({ success: true, data: result })
        } else {
            res.status(404).send({ success: false, data: result })
        }
    }
    catch (error) {
        res.status(500).send({ success: false, data: error })
    }
}