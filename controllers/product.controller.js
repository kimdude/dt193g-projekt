const model = require('../models/product.model');

//Get all products
exports.getAllProducts = async function() {
    return await model.findAll();
}