'use strict'

const client = require('../database/db');
const Hapi = require('@hapi/hapi');
const Joi = require('joi');

//Controller
const productController = require('../controllers/product.controller');

//Admin routes
module.exports = (server) => {
    server.route([

        //Get all products


        //Get specific product


        //Add product


        //Update product


        //Update amount in stock


        //Update status


        //Delete product


    ])
}