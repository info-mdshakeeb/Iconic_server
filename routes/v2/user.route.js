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


module.exports = Router;