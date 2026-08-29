require("dotenv").config();
const express = require("express");
const cors = require("cors");

const mysql = require("mysql2");

const app = express();

app.use(cors());

app.use(express.json());

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});
 db.connect((err) => {
  if (err) {
    console.error("Database connection failed:", err.message);
    return;
  }

  console.log("MySQL Connected");
});
app.get("/", (req, res) => {
  res.send("Backend Running");
});
app.get("/products", (req, res) => {
  const sql = "SELECT * FROM products";

  db.query(sql, (err, result) => {
    if (err) {
      console.error("Error fetching products:", err.message);

      return res.status(500).json({
        message: "Database error",
      });
    }

    res.json(result);
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});