'use strict'

const client = require('../database/db');
const Boom = require('@hapi/boom');

/* Order routes */
//Fetching all orders
exports.findAll = async function() {
    const result = await client.query(`SELECT * FROM orders;`);

    //Boom error
    if(result.rows.length === 0) return null;

    return result.rows;
}

//Fetching specific order
exports.find = async function(id) {
    const result = await client.query(`SELECT * FROM full_order WHERE order_id=$1;`, [id]);

    //Boom error
    if(result.rows.length === 0) throw Boom.notFound('Order not found');

    return result.rows;
}

//Adding order
exports.add = async function(id, data) {
    const { products } = data; 
    let status = false;

    const order = await client.query(`INSERT INTO orders(status, user_id) VALUES ($1, $2) RETURNING order_id;`, [status, id]);
    const orderId = order.rows[0].order_id;

    for(const product of products) {
        let addedProduct = await client.query(`
            INSERT INTO ordered_products(order_id, product_id, amount, price) VALUES ($1, $2 , $3, $4);`, 
            [orderId, product.product_id, product.amount, product.totalPrice]);

            if(addedProduct.rows.length === 0) throw Boom.notFound('Product not found.');
    }

    const result = await client.query(`
        SELECT * FROM full_order WHERE order_id=$1`,
        [orderId]
    );

    //Boom error
    if(result.rows.length === 0) throw Boom.conflict('A conflict occurred.');

    return result.rows;
}

//Updating order
exports.update = async function(id, data) {
    try {
        const { status } = data;

        const result = await client.query(`UPDATE orders SET status=$1, date=NOW() WHERE order_id=$2 RETURNING *`, [status, id]);

        //Boom error
        if(result.rows.length === 0) throw Boom.notFound('Order not found');

        return result.rows[0];

    } catch(error) {
        throw error;
    }
}

//Deleting order
exports.delete = async function(id) {
    try {
        await client.query(`DELETE FROM ordered_products WHERE order_id=$1 RETURNING product_id;`, [id]);

        const result = await client.query(`DELETE FROM orders WHERE order_id=$1 RETURNING *`, [id]);

        //Boom error
        if(result.rows.length === 0) throw Boom.notFound('Order not found');

        return result.rows[0]

    } catch(error) {
        throw error;
    }
}