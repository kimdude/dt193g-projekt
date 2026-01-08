'use strict'

const model = require('../models/admin.model');

//Getting all users
exports.getAllUsers = async function() {
    try {
        return await model.findAll();
    } catch(error) {
        throw error;
    }
}

//Adding user
exports.addUser = async function(data) {
    try {
        return await model.add(data);
    } catch(error) {
        throw error;
    }
}

//Getting specific user
exports.getUser = async function(data) {
    try {
        return await model.find(data);
    } catch(error) {
        throw error;
    }
}

//Updating user
exports.updateUser = async function(id, data) {
    try {
        return await model.update(id, data);
    } catch(error) {
        throw error;
    }
}

//Deleting user
exports.deleteUser = async function(id) {
    try {
        return await model.delete(id);
    } catch(error) {
        throw error;
    }
}