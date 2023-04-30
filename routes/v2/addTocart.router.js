const express = require("express");
const addToCart = require("../../controller/addToCart.controller");
const Router = express.Router();

Router.route('/')
    .get(addToCart.getAddTwoCartByUser)
    .post(addToCart.addAddTwoCartByUser)
    .put(addToCart.updateAddTwoCartByUser)
    .delete(addToCart.deleteAddTwoCartByUser)


//payment route    
Router.route('/payment')
    .delete(addToCart.deleteCartAfterPayment)

Router.route('/payment/confirmed')
    .get(addToCart.getPaymentDataByUser)
    .post(addToCart.addPaymentData)

Router.route('/payment/confirmed/:email')
    .get(addToCart.getPaymentDataBySeller)


module.exports = Router;

