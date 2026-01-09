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
        throw new Error ("Database error: " + error.message);
    }
}

//Fetching specific product
exports.find = async function(id) {
    try{
        const result = await client.query(`SELECT * FROM products WHERE product_id=$1;`, [id]);

        if(result.rows.length === 0) {
            return null;
        }

        return result.rows[0];
        
    } catch(error) {
        throw new Error ("Database error: " + error.message);
    }
}

//Adding product
exports.add = async function() {
    try{

    } catch(error) {
        throw new Error ("Database error: " + error.message);
    }
}

//Editing product
exports.edit = async function(id) {
    try{

    } catch(error) {
        throw new Error ("Database error: " + error.message);
    }
}

//Deleting product
exports.delete = async function(id) {
    try{

    } catch(error) {
        throw new Error ("Database error: " + error.message);
    }
}