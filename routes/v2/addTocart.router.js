const express = require("express");
const addToCart = require("../../controller/addToCart.controller");
const Router = express.Router();

Router.route('/')
    .get(addToCart.getAddTwoCartByUser)
    .post(addToCart.addAddTwoCartByUser)
    .put(addToCart.updateAddTwoCartByUser)
    .delete(addToCart.deleteAddTwoCartByUser)

Router.route('/payment')
    .put(addToCart.paymentOne)

Router.route('/confirmed')
    .put(addToCart.paymentOne)

module.exports = Router;

