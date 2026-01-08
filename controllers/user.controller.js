'use strict'

const model = require('../models/user.model');

exports.findUser = async function(data) {
    return await model.find(data);
}