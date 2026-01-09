'use strict'

const client = require('../database/db');
const Hapi = require('@hapi/hapi');

/* Product routes */
//Fetching all products
exports.findAll = async function() {
    try{
        const result = await client.query(`SELECT * FROM products;`);

        return result.rows;

    } catch(error) {
        throw error;
    }
}

//Fetching specific product
exports.find = async function(id) {
    try{
        const result = await client.query(`SELECT * FROM products WHERE product_id=$1;`, [id]);

        if(result.rows.length === 0) return null;

        return result.rows[0];
        
    } catch(error) {
        throw error;
    }
}

//Fetching shelfs
exports.updateAmount = async function() {
    try {

    } catch(error) {
        throw error;
    }
}

//Adding product
exports.add = async function(data) {
    try{
        const { ean_code, name, label, category, description, price, amount, status, shelf_id } = data;

        await client.query(`
            INSERT INTO products(ean_code, name, label, category, description, price, amount, status, shelf_id)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING name;`, 
            [ean_code, name, label, category, description, price, amount, status, shelf_id]
        );

        return "Product added.";

    } catch(error) {
        throw error;
    }
}

//Editing product
exports.edit = async function(id, data) {
    try{
        const { ean_code, name, label, category, description, price, shelf_id } = data;

        const result = await client.query(`
            UPDATE products SET ean_code=$1, name=$2, label=$3, category=$4, description=$5, price=$6, shelf_id=$7 WHERE product_id=$8 RETURNING *;`,
            [ean_code, name, label, category, description, price, shelf_id, id]
        );

        if(!result) return null;

        return result.rows;

    } catch(error) {
        throw error;
    }
}

//Updating amount and status
exports.update = async function(id, data) {
    try {
        const { amount, status } = data;

        const result = await client.query(`
            UPDATE products SET amount=$1, status=$2, added=NOW() WHERE product_id=$3 RETURNING name;`,
            [amount, status, id]
        );

        if(result.rows.length === 0) return null;

        return result.rows[0];

    } catch(error) {
        throw error;
    }
}

//Deleting product
exports.delete = async function(id) {
    try{

        await client.query(`
            DELETE FROM ordered_products WHERE product_id=$1 RETURNING order_id;`,
            [id]
        );
        
        const result = await client.query(`
            DELETE FROM products WHERE product_id=$1 RETURNING name;`,
            [id]
        );

        if(result.rows.length === 0) return null;

        return result.rows[0];

    } catch(error) {
        throw error;
    }
}