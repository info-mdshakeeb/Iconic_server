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

Router.route('/verified/all')
    .get(productsRoute.infiniteScrollProducts)
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

Router.route('/advertisement')
    /**
     * /api/v2/products/advertisement/products:
     * get:
     * description: Get advertisement products
     **/
    .get(productsRoute.getAdvertisementProducts);
Router.route('/advertisement/verified')
    /**
     * /api/v2/products/advertisement/verified:
     * get:
     * description: Get advertisement products
     **/
    .get(productsRoute.getAdvertisementProductsVr);



Router.route('/random')
    /**
     * /api/v2/products/random:
     * get:
     * description: Get random products
     * responses:
     **/
    .get(productsRoute.getRandomProducts);

module.exports = Router;