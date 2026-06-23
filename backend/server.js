const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");

const app = express();

app.use(cors());
app.use(express.json());

// MySQL Connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "viji",
  database: "ecommerce"
});

db.connect((err) => {
  if (err) {
    console.log("Database connection failed");
    throw err;
  }
  console.log("MySQL Connected");
});

// Home Route
app.get("/", (req, res) => {
  res.send("Backend Running");
});

// Get Products
app.get("/products", (req, res) => {
  db.query("SELECT * FROM products", (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send("Database error");
    } else {
      res.json(result);
    }
  });
});

// Start Server
app.listen(5000, () => {
  console.log("Server running on port 5000");
});