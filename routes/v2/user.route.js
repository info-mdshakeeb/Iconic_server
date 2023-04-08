const express = require("express");
const usersRoute = require("../../controller/users.controller");
const Router = express.Router();

Router.route('/')
    /**
     * /api/v2/users:
     * get:
     * description: Get all users
    **/
    .get(usersRoute.user)
    /**
     * /api/v2/users:
     * post:
     * description: post a user
     **/
    .post(usersRoute.postUser)
    /**
     * /api/v2/users:
     * put:
     * description: update a user
     * parameters:
     * - name: email
    **/
    .put(usersRoute.updateUser)

Router.route('/address')
    /**
     * /api/v2/users/address:
     * get:
     * description: Get all address
     **/
    .get(usersRoute.getAddress)
    /**
     * /api/v2/users/address:
     * post:
     * description: post a address
     **/
    .post(usersRoute.postAddress)
    .delete(usersRoute.deleteAddress)


module.exports = Router;