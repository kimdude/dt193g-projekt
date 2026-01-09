const model = require('../models/order.model');

//Getting all orders
 exports.getAllOrders = async function(){
    return await model.findAll();
}

//Getting specific order
exports.getOrder = async function(id){
    return await model.find(id);
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