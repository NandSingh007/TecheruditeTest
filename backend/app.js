// Import required modules
const express = require("express");
const cors = require("cors");
const mysql = require("mysql");
const userRoutes = require("./Router/userRoutes"); // Import the router correctly
const config = require("./config/config");

// Initialize the app
const app = express();

// Middleware setup
app.use(express.json()); // This is enough to parse JSON requests
app.use(cors()); // Enable CORS

// Use routes
app.use("/", userRoutes); // Use the routes directly

// MySQL connection setup
const db = mysql.createConnection({
  host: config.dbHost, // Get from config
  user: config.dbUser, // Get from config
  password: config.dbPassword, // Get from config
  database: config.dbName, // Get from config
});

// Connect to MySQL
db.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL:", err);
    return;
  }
  console.log("Connected to MySQL");
});

// Example route to test the database connection
app.get("/", (req, res) => {
  res.send("Hello from the server!");
});

// Example route to query the database
app.get("/users", (req, res) => {
  const query = "SELECT * FROM users"; // Replace 'users' with your table name
  db.query(query, (err, results) => {
    if (err) {
      console.error("Error querying the database:", err);
      return res.status(500).send("Server error");
    }
    res.json(results);
  });
});

// Define the port to listen on
const port = config.port;

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
