'use strict'

const model = require('../models/user.model');

exports.findUser = async function(data) {
    return await model.find(data);
}

exports.findInfo = async function(id) {
    return await model.findInfo(id);
}

exports.updatePassword = async function(id, data) {
    return await model.update(id, data);
}