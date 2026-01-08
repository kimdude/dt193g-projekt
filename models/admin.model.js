'use strict'

const client = require('../database/db');
const bcrypt = require('bcrypt');

/* Admin routes */
//Fetching all users
exports.findAll = async function() {
    try {
        
        const result = await client.query(`SELECT role, fname, lname, username FROM users;`);
        return (result).rows;

    } catch(error) {
        throw new Error ("Database error: " + error.message);
    }
}

//Adding user
exports.add = async function(data) {
    try {

        const {role, fname, lname, username, password} = data;

        //Hashing password
        const hashedPassword = await bcrypt.hash(password, 10);

        //Inserting to database
        await client.query(
            `INSERT INTO users (role, fname, lname, username, password) VALUES ($1, $2, $3, $4, $5) RETURNING username;`, 
            [role, fname, lname, username, hashedPassword]
        );

    } catch(error) {
        throw new Error ("Database error: " + error.message);
    }
}

//Fetching specific user
exports.find = async function(data) {
    try {

        const result = await client.query(`SELECT role, fname, lname, username FROM users WHERE user_id=$1`, [data]);
        return result.rows[0];

    } catch(error) {
        throw new Error ("Database error: " + error.message);
    }
}

//Updating user
exports.update = async function(id, data) {
    try {

        const { role } = data;
        const result = await client.query(`UPDATE users SET role=$1 WHERE user_id=$2 RETURNING fname, role`, [role, id]);

        return result.rows[0];

    } catch(error) {
        throw new Error ("Database error: " + error.message);
    }
}