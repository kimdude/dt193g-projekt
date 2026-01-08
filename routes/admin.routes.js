'use strict'

const Joi = require('joi');
const adminController = require('../controllers/admin.controller');

//Admin routes
module.exports = (server) => {
    server.route([

        //Route to get all users
        {
            method: 'GET',
            path: '/admin/users',
            handler: async(request, h) => {
                const result = await adminController.getAllUsers();
                return h.response(result);
            },
            options: {
                auth: {
                    strategy: 'jwt',
                    scope: ['admin']
                }
            }
        },

        //Route to add user
        {
            method: 'POST',
            path: '/admin/users',
            handler: async(request, h) => {
                const result = await adminController.addUser(request.payload);
                return h.response(result);
            },
            options: {
                auth: {
                    strategy: 'jwt',
                    scope: ['admin']
                },
                validate: {
                    payload: Joi.object({
                        role: Joi.string().min(1).max(15).required(),
                        fname: Joi.string().min(1).max(10).required(),
                        lname: Joi.string().min(1).max(15).required(),
                        username: Joi.string().min(1).max(25).required(),
                        password: Joi.string().min(1).max(255).required(),
                    })
                }
            }
        },

        //Route to get specific user
        {
            method: 'GET',
            path: '/admin/users/{id}',
            handler: async(request, h) => {
                const result = await adminController.getUser(request.params.id);
                return h.response(result);
            },
            options: {
                auth: {
                    strategy: 'jwt',
                    scope: ['admin']
                },
                validate: {
                    params: Joi.object({
                        id: Joi.number().integer().min(1).required()
                    })
                }
            }
        }

        //Route to update user


    ]);
};

