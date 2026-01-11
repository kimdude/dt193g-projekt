'use strict'

const model = require('../models/user.model');

//Getting user
exports.findUser = async function(data) {
    return await model.find(data);
}

//Getting user info
exports.findInfo = async function(id) {
    return await model.findInfo(id);
}

//Updating password
exports.updatePassword = async function(id, data) {
    return await model.update(id, data);
}