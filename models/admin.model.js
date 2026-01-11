'use strict'

const client = require('../database/db');
const bcrypt = require('bcrypt');
const Boom = require('@hapi/boom');

/* Admin routes */
//Fetching all users
exports.findAll = async function() {
    const result = await client.query(`SELECT user_id, role, fname, lname, username FROM users;`);

    if(result.rows.length ===  0) return null;
    
    return result.rows;
}

//Adding user
exports.add = async function(data) {
    const {role, fname, lname, username, password} = data;

    //Hashing password
    const hashedPassword = await bcrypt.hash(password, 10);

    //Inserting to database
    const result = await client.query(
        `INSERT INTO users (role, fname, lname, username, password) VALUES ($1, $2, $3, $4, $5) RETURNING username;`, 
        [role, fname, lname, username, hashedPassword]
    );

    //Boom error
    if(result.rows.length === 0) throw Boom.conflict('A conflict occurred.');

    return result.rows[0];
}

//Fetching specific user
exports.find = async function(data) {
    const result = await client.query(`SELECT user_id, role, fname, lname, username FROM users WHERE user_id=$1`, [data]);

    //Boom error
    if(result.rows.length ===  0) throw Boom.notFound('User not found.');

    return result.rows[0];
}

//Updating user
exports.update = async function(id, data) {
    const { role } = data;
    const result = await client.query(`UPDATE users SET role=$1 WHERE user_id=$2 RETURNING username`, [role, id]);

    //Boom error
    if(result.rows.length ===  0) throw Boom.notFound('User not found.');

    return result.rows[0];
}