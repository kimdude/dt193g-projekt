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
        {
            method: 'GET',
            path: '/orders',
            handler: async(request, h) => {
                const result = await orderController.getAllOrders();
                return h.response({ result }).code(200);
            },
            options: {
                auth: {
                    strategy: 'jwt',
                    scope: ['user', 'admin']
                }
            }
        },

        //Get specific order
        {
            method: 'GET',
            path: '/orders/{id}',
            handler: async(request, h) => {
                const result = await orderController.getOrder(request.params.id);
                return h.response({ result }).code(200);
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

        //Add order
        {
            method: 'POST',
            path: '/orders',
            handler: async(request, h) => {
                const userId = request.auth.credentials.id;

                const result = await orderController.addOrder(userId, request.payload);
                return h.response({ result }).code(200);
                
            },
            options: {
                auth: {
                    strategy: 'jwt',
                    scope: ['user', 'admin']
                },
                validate: {
                    payload: Joi.object({
                        products: Joi.array()
                            .min(1)
                            .items(
                                Joi.object({
                                    product_id: Joi.number().integer().min(1).required(), 
                                    amount: Joi.number().integer().min(1).required(), 
                                    totalPrice: Joi.number().integer().min(1).required()
                                })
                            )
                            .required()
                    })
                }
            }
        },

        //Edit order
        {
            method: 'PUT',
            path: '/orders/{id}',
            handler: async(request, h) => {
                const result = await orderController.updateOrder(request.params.id, request.payload);
                return h.response({ result }).code(200);
            },
            options: {
                auth: {
                    strategy: 'jwt',
                    scope: ['user', 'admin']
                },
                validate: {
                    params: Joi.object({
                        id: Joi.number().integer().min(1).required()
                    }),
                    payload: Joi.object({
                        status: Joi.bool().required()
                    })
                }
            }
        },

        //Edit status
        {
            method: 'DELETE',
            path: '/orders/{id}',
            handler: async(request, h) => {
                const result = await orderController.deleteOrder(request.params.id);
                return h.response({ result }).code(200);
            },
            options: {
                auth: {
                    strategy: 'jwt',
                    scope: ['user', 'admin']
                }
            }
        }
    ])
}