const model = require('../models/product.model');

//Get all products
exports.getAllProducts = async function() {
    return await model.findAll();
}

//Get specific products
exports.getProduct = async function(id) {
    return await model.find(id);
}

//Add product
exports.addProduct = async function(data) {
    return await model.add(data);
}

//Update product
exports.updateProduct = async function(id, data) {
    return await model.edit(id, data);
}