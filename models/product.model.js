'use strict'

const client = require('../database/db');
const Boom = require('@hapi/boom');

/* Product routes */
//Fetching all products
exports.findAll = async function() {
    const result = await client.query(`SELECT * FROM products;`);

    if(result.rows.length ===  0) return null;

    return result.rows;

}

//Fetching shelfs
exports.findShelfs = async function() {
    const result = await client.query(`SELECT * FROM shelf_units;`);

    if(result.rows.length ===  0) return null;

    return result.rows;
}

//Fetching specific product
exports.find = async function(id) {
    const result = await client.query(`SELECT * FROM products WHERE product_id=$1;`, [id]);

    //Boom error
    if(result.rows.length === 0) throw Boom.notFound('Product not found.');

    return result.rows[0];
}

//Adding product
exports.add = async function(data) {
    const { ean_code, name, label, category, description, price, amount, status, shelf_id } = data;

    const result = await client.query(`
        INSERT INTO products(ean_code, name, label, category, description, price, amount, status, shelf_id)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING name;`, 
        [ean_code, name, label, category, description, price, amount, status, shelf_id]
    );

    //Boom error
    if(result.rows.length === 0) throw Boom.conflict('A conflict occurred.');

    return result.rows[0];
}

//Editing product
exports.edit = async function(id, data) {
        const { ean_code, name, label, category, description, price, shelf_id } = data;

        const result = await client.query(`
            UPDATE products SET ean_code=$1, name=$2, label=$3, category=$4, description=$5, price=$6, shelf_id=$7 WHERE product_id=$8 RETURNING *;`,
            [ean_code, name, label, category, description, price, shelf_id, id]
        );

        //Boom error 
        if(result.rows.length === 0) throw Boom.notFound('Product not found.');

        return result.rows;
}

//Updating amount and status
exports.update = async function(id, data) {
    const { amount, status } = data;

    const result = await client.query(`
        UPDATE products SET amount=$1, status=$2, added=NOW() WHERE product_id=$3 RETURNING name;`,
        [amount, status, id]
    );

    //Boom error 
    if(result.rows.length === 0) throw Boom.notFound('Product not found.');

    return result.rows[0];
}

//Deleting product
exports.delete = async function(id) {
        const orders = await client.query(`
            DELETE FROM ordered_products WHERE product_id=$1 RETURNING order_id;`,
            [id]
        );

        //Deleting order if it doesn't contain other products
        for(const order of orders.rows) {   
            const orderSpec = await client.query(`SELECT * FROM ordered_products WHERE order_id=$1;`, 
                [order.order_id]
            );

            if(orderSpec.rows.length === 0) {
                await client.query(`DELETE FROM orders WHERE order_id=$1;`, [order.order_id]);
            }
        }
        
        const result = await client.query(`
            DELETE FROM products WHERE product_id=$1 RETURNING name;`,
            [id]
        );

        //Boom error
        if(result.rows.length === 0) throw Boom.notFound('Product not found.');

        return result.rows[0];
}