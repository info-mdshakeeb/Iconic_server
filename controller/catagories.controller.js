const { getDb } = require("../utilities/mongodb");

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