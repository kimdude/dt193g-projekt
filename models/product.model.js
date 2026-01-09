'use strict'

const client = require('../database/db');
const Hapi = require('@hapi/hapi');

/* Product routes */
//Fetching all products
exports.findAll = async function() {
    try{
        const result = await client.query(`SELECT * FROM products;`);
        const products = result.rows[0];

        return products;

    } catch(error) {
        throw new Error ("Database error: " + error.message);
    }
}

//Fetching specific product
exports.find = async function(id) {
    try{

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