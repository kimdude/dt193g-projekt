const model = require('../models/product.model');

//Get all products
exports.getAllProducts = async function() {
    return await model.findAll();
}

//Get specific products
exports.getProduct = async function(id) {
    return await model.find(id);
}