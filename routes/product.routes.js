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
        },

        //Add product
        {
            method: 'POST',
            path: '/products',
            handler: async(request, h) => {
                const result = await productController.addProduct(request.payload);
                return h.response(result);
            },
            options: {
                auth: {
                    strategy: 'jwt',
                    scope: ['user', 'admin']
                },
                validate: {
                    payload: Joi.object({
                        ean_code: Joi.string().min(8).max(13).required(), 
                        name: Joi.string().min(1).max(50).required(), 
                        label: Joi.string().min(1).max(30), 
                        category: Joi.string().min(1).max(20).required(), 
                        description: Joi.string().min(1).max(80), 
                        price: Joi.number().integer().min(1).required(), 
                        amount: Joi.number().integer().required(), 
                        status: Joi.string().min(1).required(), 
                        shelf_id: Joi.number()
                    })
                }
            }
        },

        //Update product
        {
            method: 'PUT',
            path: '/products/{id}',
            handler: async(request, h) => {
                const productId = request.params.id;
                const result = await productController.updateProduct(productId, request.payload);

                return h.response(result);
            },
            options: {
                auth: {
                    strategy: 'jwt',
                    scope: ['user','admin']
                },
                validate: {
                    params: Joi.object({
                        id: Joi.number().integer().min(1).required()
                    }),
                    payload: Joi.object({
                        ean_code: Joi.string().min(8).max(13).required(), 
                        name: Joi.string().min(1).max(50).required(), 
                        label: Joi.string().min(1).max(30), 
                        category: Joi.string().min(1).max(20).required(), 
                        description: Joi.string().min(1).max(80), 
                        price: Joi.number().integer().min(1).required(), 
                        shelf_id: Joi.number()
                    })
                }
            }
        }

        //Update amount in stock


        //Update status


        //Delete product


    ])
}