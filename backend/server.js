require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");

const app = express();


// Middleware

app.use(cors());

app.use(express.json());


// MySQL Connection

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});


// Connect to MySQL

db.connect((err) => {

    if (err) {

        console.error(
            "Database connection failed:",
            err.message
        );

        return;

    }


    console.log(
        "MySQL Connected"
    );

});


// Home Route

app.get("/", (req, res) => {

    res.send(
        "Backend Running"
    );

});


// Get Products

app.get("/products", (req, res) => {


    const sql =
        "SELECT * FROM products";


    db.query(
        sql,
        (err, result) => {


            if (err) {

                console.error(
                    "Error fetching products:",
                    err.message
                );


                return res
                    .status(500)
                    .json({

                        message:
                            "Database error"

                    });

            }


            res.json(result);

        }
    );

});


// Start Server

app.listen(
    5000,
    () => {

        console.log(
            "Server running on port 5000"
        );

    }
);