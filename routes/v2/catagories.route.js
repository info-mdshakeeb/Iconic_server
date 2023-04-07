const express = require("express");
const catagoriesRoute = require("../../controller/catagories.controller");
const Router = express.Router();

Router.route('/')
    /**
     * /api/v2/catagories:
     * get:
     * description: Get all catagories
     * responses:
     * '200':
     * description: A successful response
     * content:
     * application/json:
     **/
    .get(catagoriesRoute.catagories)

Router.route('/:id')
    /**
     * /api/v2/catagories:
     * get:
     * description: Get a category
     * responses:
     **/
    .get(catagoriesRoute.categoryWise)

module.exports = Router;