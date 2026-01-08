'use strict'

const { Client } = require('pg');
const Hapi = require('@hapi/hapi');
require('dotenv').config();

//Connecting to server
const init = async () => {
    const server = Hapi.server({
        port: 5000,
        host: '0.0.0.0',
        routes: {
            cors: {
                origin: ['*']
            }
        }
    });

    //Connecting to database
    require('./database/db');

    //Requiring routes
    require('./routes/product.routes')(server);
    require('./routes/order.routes')(server);
    require('./routes/admin.routes')(server);

    await server.start();
    console.log('Server running on %s', server.info.uri);
}

process.on('unhandledRejection', (error) => {
    console.log(error);
    process.exit(1);
});

init();