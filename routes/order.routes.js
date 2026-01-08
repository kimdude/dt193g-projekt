'use strict'

const client = require('../database/db');
const Hapi = require('@hapi/hapi');
const Joi = require('joi');

//Controller
const orderController = require('../controllers/order.controller');

//Admin routes
module.exports = (server) => {
    server.route([

        //Get all orders


        //Get specific order


        //Add order


        //Edit order


        //Edit status

    
    ])
}