require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MySQL Connection Pool
const db = mysql.createPool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT || 3306,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    ssl: {
        rejectUnauthorized: false
    }
});

// Test MySQL connection
db.getConnection((err, connection) => {
    if (err) {
        console.error(
            "Database connection failed:",
            err.message
        );
        return;
    }

    console.log("MySQL Connected");

    connection.release();
});

// Home Route
app.get("/", (req, res) => {
    res.send("Backend Running");
});

// Get Products
app.get("/products", (req, res) => {
    const sql = "SELECT * FROM products";

    db.query(sql, (err, result) => {
        if (err) {
            console.error(
                "Error fetching products:",
                err.message
            );

            return res.status(500).json({
                message: "Database error",
                error: err.message
            });
        }

        res.json(result);
    });
});

// Start Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(
        `Server running on port ${PORT}`
    );
});
