const express = require("express");
const addToCart = require("../../controller/addToCart.controller");
const Router = express.Router();

Router.route('/')
    .get(addToCart.getAddTwoCartByUser)
    .post(addToCart.addAddTwoCartByUser)
    .put(addToCart.updateAddTwoCartByUser)
    .delete(addToCart.deleteAddTwoCartByUser)


module.exports = Router;

