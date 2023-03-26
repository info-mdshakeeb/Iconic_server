const express = require("express");
const Router = express.Router();
const shopsRoute = require("../../controller/shops.controller");

Router.route('/')
    /**
     * /api/v2/shops:
     * get:
     * description: Get all shops
     * responses:
     * '200':
     * description: A successful response
     * */
    .get(shopsRoute.shops)
    /**
     * /api/v2/shops:
     * post:
     * description: post a shop
     * */
    .post(shopsRoute.addShop)

Router.route('/:email')
    /**
       * /api/v2/shop:
       * get:
       * description: Get a shop
       * responses:
       * '200':
       * description: A successful response
    **/
    .get(shopsRoute.shop)

Router.route('/update/:id')
    /**
     * /api/v2/shop:
     * put:
     * description: update a shop
     * parameters:
     * - name: id
     * */
    .put(shopsRoute.updateShop)


module.exports = Router;