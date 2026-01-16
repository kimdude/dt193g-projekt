const model = require('../models/order.model');
const Boom = require('@hapi/boom');

//Getting all orders
 exports.getAllOrders = async function(){
    return await model.findAll();
}

//Getting specific order
exports.getOrder = async function(orderId, productId){
    if(orderId === null && productId === null || orderId === undefined && productId === undefined) throw Boom.badRequest('Must query either orderId or productId in URL.');
    else return await model.find(orderId, productId);
}

//Adding order
exports.addOrder = async function(id, data){
    return await model.add(id, data);
}

//Updating order
exports.updateOrder = async function(id, data){
    return await model.update(id, data);
}

//Deleting order
exports.deleteOrder = async function(id){
    return await model.delete(id);
}