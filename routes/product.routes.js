'use strict'

const Hapi = require('@hapi/hapi');
const Joi = require('joi');

//Controller
const productController = require('../controllers/product.controller');

//Admin routes
module.exports = (server) => {
    server.route([

        //Get all products
        {
            method: 'GET',
            path: '/products',
            handler: async(request, h) => {
                const result = await productController.getAllProducts();
                return h.response(result);
            },
            options: {
                auth: {
                    strategy: 'jwt',
                    scope: ['user', 'admin']
                }
            }
        }

        //Get specific product


        //Add product


        //Update product


        //Update amount in stock


        //Update status


        //Delete product


    ])
}