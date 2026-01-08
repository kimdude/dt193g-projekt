'use strict'

const userController = require('../controllers/user.controller');
const Joi = require('joi');

//User routes
module.exports = (server) => {
    server.route([

        //Login user
        {
            method: 'POST',
            path: '/login',
            handler: async(request, h) => {
                const result = await userController.findUser(request.payload);
                return h.response(result);
            },
            options: {
                validate: {
                    payload: Joi.object({
                        username: Joi.string().min(1).max(25).required(),
                        password: Joi.string().min(1).max(255).required(),
                    })
                }
            }
        },
        
        //Getting user info
        {
            method: 'GET',
            path: '/user',
            handler: async(request, h) => {
                const userId = request.auth.credentials.id;
                const result = await userController.findInfo(userId);
                return h.response(result);
            },
            options: {
                auth: {
                    strategy: 'jwt',
                    scope: ['user','admin']
                }
            }
        },

        //Updating password
        {
            method: 'PUT',
            path: '/user',
            handler: async(request, h) => {
                const userId = request.auth.credentials.id;
                const result = await userController.updatePassword(userId, request.payload);
                return h.response(result);
            },
            options: {
                auth: {
                    strategy: 'jwt',
                    scope: ['user','admin']
                }
            }
        }
    ]);
}
