const Hapi = require('@hapi/hapi');
const client = require('../database/db');
const bcrypt = require('bcrypt');
require('dotenv').config();

//Login
exports.loginUser = async function(decoded, request, h) {

    try {

        //Check username
        const result = await client.query(`SELECT * FROM users WHERE username=$1`, [request.username]);

        if(result.rows.length === 0) {
            throw new Error("Invalid username or password.");
        }

        //Checking password
        const user = result.rows[0];
        passwordMatch = await comparePassword(user, request.password);

        if(!passwordMatch) {
            throw new Error("Invalid username or password.");
        }

        //Creating JWT token
        
        

    } catch(error) {
        throw new Error ("Server error: " + error.message);
    }

    //Missing token


    //Verify token


    //Check roll 

}