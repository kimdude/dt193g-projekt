'use strict'

const model = require('../models/admin.model');

//Getting all users
exports.getAllUsers = async function() {
    return await model.findAll();
}

//Adding user
exports.addUser = async function(data) {
    return await model.add(data);
}

//Getting specific user
exports.getUser = async function(data) {
        return await model.find(data);
}

//Updating user
exports.updateUser = async function(id, data) {
    return await model.update(id, data);
}

//Deleting user
exports.deleteUser = async function(id) {
    return await model.delete(id);
}