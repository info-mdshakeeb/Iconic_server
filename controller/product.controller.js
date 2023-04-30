const { getDb } = require("../utilities/mongodb");
const ObjectId = require('mongodb').ObjectID;

module.exports.products = async (req, res) => {
    const db = getDb();
    const Products = db.collection("products");
    const limit = req.query.limit;
    try {
        if (limit) {
            const result = await Products.find({ status: "published" }).limit(parseInt(limit)).toArray();
            if (result.length) { res.status(200).send({ success: true, data: result }) }
            else { res.status(404).send({ success: false, data: result }) }
        } else {
            const result = await Products.find({ status: "published" }).toArray();
            if (result.length) { res.status(200).send({ success: true, data: result }) }
            else { res.status(404).send({ success: false, data: result }) }
        }
    }
    catch (error) { res.status(500).send({ success: false, data: error }) }
}
// infinite scroll products get :
module.exports.infiniteScrollProducts = async (req, res) => {

    const db = getDb();
    const Products = db.collection("products");
    const Limit = req.query.Limit;// Number of items to return per page
    const page = req.query.page || 1;
    const skip = (page - 1) * Limit; // Number of items to skip
    try {
        const result = await Products.find({ status: "published" }).skip(parseInt(skip)).limit(parseInt(Limit)).toArray();
        if (result.length) { res.status(200).send({ success: true, data: result }) }
        else { res.status(404).send({ success: false, data: result }) }
    }
    catch (error) { res.status(500).send({ success: false, data: error }) }
}


module.exports.addProduct = async (req, res) => {
    const db = getDb();
    const Products = db.collection("products");
    try {
        const result = await Products.insertOne(req.body);
        if (result) {
            res.status(200).send({ success: true, data: result })
        } else {
            res.status(404).send({ success: false, data: result })
        }
    }
    catch (error) {
        res.status(500).send({ success: false, data: error })
    }
}
module.exports.getProductsByUser = async (req, res) => {
    const db = getDb();
    const Products = db.collection("products");
    const { email } = req.params;
    const query = { ownerEmail: email }
    try {
        const result = await Products.find(query).toArray()
        if (result.length) {
            res.send({ success: true, data: result })
        } else {
            res.status(404).send({ success: false, data: result })
        }
    } catch (error) {
        res.status(500).send({ success: false, data: error })
    }
}
module.exports.updateProduct = async (req, res) => {
    const db = getDb();
    const Products = db.collection("products");
    const { id } = req.params;
    const newProduct = req.body;
    const filter = { _id: ObjectId(id) }
    const options = { upsert: true }
    try {
        if (!!newProduct.shop) {
            // console.log(newProduct);
            const updateDoc = { $set: { shop: newProduct.shop, shopId: newProduct.shopId, Quantity: newProduct?.Quantity } }
            const result = await Products.updateOne(filter, updateDoc, options)
            res.status(200).send({ success: true, data: result })
            return;
        } else if (!!newProduct.status) {
            const updateDoc = { $set: { status: newProduct.status } }
            const result = await Products.updateOne(filter, updateDoc, options)
            res.status(200).send({ success: true, data: result })
            return;
        }
        else {
            const updateDoc = { $set: { Advertisement: newProduct.Advertisement } }
            const result = await Products.updateOne(filter, updateDoc, options)
            res.status(200).send({ success: true, data: result })
        }
    } catch (error) {
        res.status(500).send({ success: false, data: error })
    }
}
module.exports.getProductsByShop = async (req, res) => {
    const db = getDb();
    const Products = db.collection("products");
    const Shops = db.collection("shops");
    const { id } = req.params;
    try {
        const shop = await Shops.findOne({ _id: ObjectId(id) })
        const query = { shop: shop?.name }
        const result = await Products.find(query).toArray();
        if (result.length) {
            res.status(200).send({ success: true, data: result })
        }
    } catch (error) {
        res.status(500).send({ success: false, data: error })
    }
}
module.exports.getProductById = async (req, res) => {
    const db = getDb();
    const Products = db.collection("products");
    const { id } = req.params;
    try {
        const result = await Products.findOne({ _id: ObjectId(id) })
        if (result) {
            res.status(200).send({ success: true, data: result })
        } else {
            res.status(404).send({ success: false, data: result })
        }
    } catch (error) {
        res.status(500).send({ success: false, data: error })
    }
}
module.exports.getRandomProducts = async (req, res) => {
    const db = getDb();
    const Products = db.collection("products");
    const limit = req.query.limit;
    try {
        const result = await Products.aggregate([{ $sample: { size: parseInt(limit) } }]).toArray();
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
//get Advertisement products
module.exports.getAdvertisementProducts = async (req, res) => {
    const db = getDb();
    const Products = db.collection("products");
    try {
        const result = await Products.find({ Advertisement: "pending", status: "published" }).toArray();
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
module.exports.getAdvertisementProductsVr = async (req, res) => {
    const db = getDb();
    const Products = db.collection("products");
    try {
        const result = await Products.find({ Advertisement: "acceded", status: "published" }).toArray();
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
