const express = require("express");
const Router = express.Router();
const productsRoute = require("../../controller/product.controller");


Router.route('/')
    /**
     * /api/v2/products:
     * get:
     * description: Get all products
     * responses:
     **/
    .get(productsRoute.products)
    /**
     * /api/v2/products:
     * post:
     * description: add new product
     * */
    .post(productsRoute.addProduct);

Router.route('/:id')
    /**
     * /api/v2/products:
     * put:
     * description: update product
     * */
    .put(productsRoute.updateProduct)

Router.route('/user/:email')
    /**
     * /api/v2/products/:email:
     * get:
     * description: Get all products by user
     * responses:
     **/
    .get(productsRoute.getProductsByUser);


Router.route('/shop/:id')
    /**
     *  /api/v2/products/shop/:id:
     * get:
     * description: Get all products by shop
     * responses:
     **/
    .get(productsRoute.getProductsByShop);

Router.route('/id/:id')
    /**
     *  /api/v2/products/id/:id:
     * get:
     * description: Get product by id
     **/
    .get(productsRoute.getProductById);

module.exports = Router;