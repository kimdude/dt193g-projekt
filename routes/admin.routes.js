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
            config: {
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
            config: {
                auth: {
                    strategy: 'jwt',
                    scope: ['admin']
                }
            },
            options: {
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

        //Route to update user

        //Route to delete user


    ]);
};

