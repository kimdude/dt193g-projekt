'use strict'

const client = require('../database/db');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Boom = require('@hapi/boom');

//Logging in user
exports.find = async function(data) {
    const { username, password } = data;

    //Validating user
    const result = await client.query(`SELECT * FROM users WHERE username=$1`, [username]);

    //Boom error
    if(result.rows.length === 0) throw Boom.unauthorized("Invalid username or password");

    const user = result.rows[0];
    const passwordMatch = await bcrypt.compare(password, user.password);

    //Boom error
    if(!passwordMatch) throw Boom.unauthorized("Invalid username or password");

    //Creating token
    const payload = { id: user.user_id, username: username, permission: user.role };
    const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, {expiresIn: "1h"});
    const response = {
        message: "User logged in",
        token: token
    }

    return response;
}

//Getting user info
exports.findInfo = async function(id) {

        const result = await client.query(`SELECT role, fname, lname, username FROM users WHERE user_id=$1`, [id]);

        //Boom error - Id is given through credentials, so error could lie elsewhere
        if(result.rows.length === 0) throw Boom.conflict("There was a conflict");

        return result.rows[0];
}

//Updating password
exports.update = async function(id, data) {
        const { password, newPassword } = data;

        //Validating password
        const result = await client.query(`SELECT * FROM users WHERE user_id=$1;`,[id]);
        const user = result.rows[0];

        const passwordMatch = await bcrypt.compare(password, user.password);

        //Boom error
        if(!passwordMatch) throw Boom.unauthorized();
        
        //Updating password 
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        const updatedUser = await client.query(`UPDATE users SET password=$1 WHERE user_id=$2 RETURNING username;`,[hashedPassword, id]);

        return updatedUser.rows[0];
}
