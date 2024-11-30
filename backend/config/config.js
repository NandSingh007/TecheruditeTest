// config/config.js
require("dotenv").config(); // Load environment variables from .env file

const config = {
  dbHost: process.env.DB_HOST || "localhost",
  dbUser: process.env.DB_USER || "root",
  dbPassword: process.env.DB_PASSWORD || "",
  dbName: process.env.DB_NAME || "Techerudite",
  port: process.env.PORT || 5000,
};

module.exports = config;
