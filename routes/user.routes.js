'use strict'

const userController = require('../controllers/user.controller');
const Joi = require('joi');

//User routes
module.exports = (server) => {

    //Login user
    server.route([
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
        }
    ])
}
