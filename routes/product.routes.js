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
        },

        //Get specific product
        {
            method: 'GET',
            path: '/products/{id}',
            handler: async(request, h) => {
                const result = await productController.getProduct(request.params.id);
                return h.response(result);
            },
            options: {
                auth: {
                    strategy: 'jwt',
                    scope: ['user', 'admin']
                },
                validate: {
                    params: Joi.object({
                        id: Joi.number().integer().min(1).required()
                    })
                }
            }
        }

        //Add product


        //Update product


        //Update amount in stock


        //Update status


        //Delete product


    ])
}