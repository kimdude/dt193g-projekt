'use strict'

const client = require('../database/db');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

//Logging in user
exports.find = async function(data) {
    const { username, password } = data;

    try {

        //Validating user
        const result = await client.query(`SELECT * FROM users WHERE username=$1`, [username]);
        const user = result.rows[0];

        if(!user) {
            throw new Error("Invalid username or password.");
        }

        const passwordMatch = await bcrypt.compare(password, user.password);

        if(!passwordMatch) {
            throw new Error("Invalid username or password.");
        }

        //Creating token
        const payload = { id: user.user_id, username: username, permission: user.role };
        const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, {expiresIn: "1h"});
        const response = {
            message: "User logged in",
            token: token
        }

        return response;

    } catch(error) {
        throw new Error("Invalid username or password.");
    }

}