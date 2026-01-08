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

//Getting specific user


//Adding user
exports.addUser = async function(data) {
    try {
        return await model.add(data);
    } catch(error) {
        throw error;
    }
}

//Updating user


//Deleting user