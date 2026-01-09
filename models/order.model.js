'use strict'

const client = require('../database/db');
const Hapi = require('@hapi/hapi');

/* Order routes */
//Fetching all orders
exports.findAll = async function() {
    try {
        const result = await client.query(`SELECT * FROM orders;`);
        return result.rows;

    } catch(error) {
        throw error;
    }
}

//Fetching specific order
exports.find = async function(id) {
    try {
        const result = await client.query(`SELECT * FROM full_order WHERE order_id=$1;`, [id]);

        if(result.rows.length === 0) return null;

        return result.rows;

    } catch(error) {
        throw error;
    }
}

//Adding order
exports.add = async function(id, data) {
    try {
        const { products } = data; 
        let status = false;

        const order = await client.query(`INSERT INTO orders(status, user_id) VALUES ($1, $2) RETURNING order_id;`, [status, id]);
        const orderId = order.rows[0].order_id;

        for(const product of products) {
            await client.query(`INSERT INTO ordered_products(order_id, product_id, amount, price) VALUES ($1, $2 , $3, $4);`, [orderId, product.product_id, product.amount, product.totalPrice]);
        }

        return "Order has been added."

    } catch(error) {
        throw error;
    }
}

//Updating order
exports.update = async function(id, data) {
    try {
        const { status } = data;

        const result = await client.query(`UPDATE orders SET status=$1, date=NOW() WHERE order_id=$2 RETURNING *`, [status, id]);

        if(result.rows.length === 0) return "Invalid order ID.";

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

        if(result.rows.length === 0) return "Invalid order ID.";

        return result.rows[0]

    } catch(error) {
        throw error;
    }
}