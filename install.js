const { Client } = require("pg");
require("dotenv").config();

//Connect to database
const client = new Client ({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    ssl: {
        rejectUnauthorized: false
    }
});

client.connect((error) => {
    if(error) {
        console.log("Ett fel uppstod vid anslutning till databasen: " + error);
    } else {
        console.log("Ansluten till databasen!");
    }
});

//Checking if tables exist
client.query(`
    DROP VIEW IF EXISTS full_order CASCADE;
    DROP TABLE IF EXISTS ordered_products CASCADE;
    DROP TABLE IF EXISTS orders CASCADE;
    DROP TABLE IF EXISTS products CASCADE;
    DROP TABLE IF EXISTS shelf_units CASCADE;
    DROP TABLE IF EXISTS users CASCADE;
`);

//Creating tables
client.query(`
    CREATE TABLE users(
        user_id     SERIAL PRIMARY KEY,
        roll        VARCHAR(15) NOT NULL,
        fname       VARCHAR(10) NOT NULL,
        lname       VARCHAR(15) NOT NULL,
        username    VARCHAR(25) UNIQUE NOT NULL,
        password    VARCHAR(255) NOT NULL
    );
`);

client.query(`
    CREATE TABLE shelf_units(
        shelf_id    SERIAL PRIMARY KEY,
        shelf       VARCHAR(5)
    );
`);

client.query(`
    CREATE TABLE products(
        product_id  SERIAL PRIMARY KEY,
        ean_code    BIGINT UNIQUE,
        name        VARCHAR(50) NOT NULL,
        label       VARCHAR(30) NOT NULL,
        category    VARCHAR(30) NOT NULL,
        description VARCHAR(80),
        price       INT NOT NULL,
        amount      INT DEFAULT 0,
        status      VARCHAR(15) NOT NULL,
        added       TIMESTAMPTZ DEFAULT NOW(),
        shelf_id    INT REFERENCES shelf_units(shelf_id)
    );
`);

client.query(`
    CREATE TABLE orders(
        order_id    SERIAL PRIMARY KEY,
        status      BOOL,
        date        TIMESTAMPTZ DEFAULT NOW(),
        user_id     INT REFERENCES users(user_id)
    );
`);

client.query(`
    CREATE TABLE ordered_products(
        order_id    INT NOT NULL REFERENCES orders(order_id),
        product_id  INT NOT NULL REFERENCES products(product_id),
        amount      INT NOT NULL,
        price       INT,
        PRIMARY KEY (order_id, product_id)
    );
`);

//Creating view
client.query(`
    CREATE VIEW full_order AS
    SELECT orders.order_id, orders.status, orders.date, orders.user_id, ordered_products.product_id, products.name, products.ean_code, ordered_products.amount, ordered_products.price,
    SUM(ordered_products.price) OVER(PARTITION BY ordered_products.order_id) AS order_total
    FROM orders
    LEFT JOIN ordered_products ON ordered_products.order_id = orders.order_id
    LEFT JOIN products ON products.product_id = ordered_products.product_id
`);

//Adding test data
client.query(`
    INSERT INTO users(roll, fname, lname, username, password) 
    VALUES
        ('admin', 'Lena', 'Lööf', 'lagerpersonal','test123');
`);

client.query(`
    INSERT INTO shelf_units(shelf) 
    VALUES 
        ('A1'),
        ('A2'),
        ('A3'),
        ('B1'),
        ('B2'),
        ('B3'),
        ('C1'),
        ('C2'),
        ('C3'),
        ('D1'),
        ('D2'),
        ('D3'),
        ('E1'),
        ('E2'),
        ('E3'),
        ('F1'),
        ('F2'),
        ('F3'),
        ('G1'),
        ('G2'),
        ('G3');
`);

client.query(`
    INSERT INTO products(ean_code, name, label, category, description, price, amount, status, shelf_id)
    VALUES  
        (1234567891111, 'Köksmaskin Royal Blue','Ankarsrum', 'Köksassistenter', 'Tålig och prisvärd köksmaskin som passar alla.', 7399, 15, 'I lager', 4),
        (1234567891112, 'Våffeljärn Svart', 'Champion', 'Våffeljärn', 'Dubbelt våffeljärn', 549, 8, 'I lager', 2),
        (1234567891113, 'Våffeljärn Röd', 'Champion', 'Våffeljärn', 'Dubbelt våffeljärn', 549, 6, 'I lager', 2),
        (1234567891114, 'Brödrost Röd 2 skivor', 'Smeg', 'Brödrost', 'Brödrost för 2 skivor i vintage stil.', 1996, 0, 'Beställd', 1);
`);

client.query(`
    INSERT INTO orders(status, user_id)
    VALUES
        (true, 1),
        (false, 1);
`);

client.query(`
    INSERT INTO ordered_products(order_id, product_id, amount, price)
    VALUES
        (1,1,15,105000),
        (1,2,10,5000),
        (1,3,10,5000),
        (2,4,20,34000);
`);





