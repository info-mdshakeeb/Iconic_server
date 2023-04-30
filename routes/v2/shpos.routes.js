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
       * /api/v2/shops:
       * get:
       * description: Get a shop by email
       * responses:
       * '200':
       * description: A successful response
    **/
    .get(shopsRoute.shop)

Router.route('/id/:id')
    /**
     * /api/v2/shops:
     * find a shop by id:
     * description: Get a shop by id
     * 
     * */
    .get(shopsRoute.getShopeByID)

Router.route('/update/:id')
    /**
     * /api/v2/shops:
     * put:
     * description: update a shop
     * parameters:
     * - name: id
     * */
    .put(shopsRoute.updateShop)

Router.route('/type/pending')
    /**
     * /api/v2/shops:
     * get:
     * description: Get all pending shops
     * responses:
     **/
    .get(shopsRoute.pendingShops)

Router.route("/type/verified")
    /**
     * /api/v2/shop/type/verified:
     * get:
     * description: Get all verified shops
     * responses:
     * */
    .get(shopsRoute.verifiedShopsScroll)

Router.route('/type/advertisement/pending')
    /**
     * /api/v2/shops/advertisement:
     * get:
     * description: Get advertisement products
     **/
    .get(shopsRoute.getAdvertisementPendingShops);

Router.route('/type/advertisement/verified')
    .get(shopsRoute.getAdvertisementShops);

module.exports = Router;