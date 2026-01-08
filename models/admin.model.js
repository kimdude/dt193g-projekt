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
exports.find = async function() {
    try {



    } catch(error) {
        throw new Error ("Database error: " + error.message);
    }
}

//Updating user
exports.update = async function() {
    try {



    } catch(error) {
        throw new Error ("Database error: " + error.message);
    }
}