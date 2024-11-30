const mysql = require("mysql2");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// MySQL Database connection
const db = mysql.createConnection({
  host: "localhost", // Your MySQL host
  user: "root", // Your MySQL username
  password: "", // Your MySQL password
  database: "Techerudite", // Your MySQL database name
});

// Controller for User Registration
exports.Register = (req, res) => {
  const { firstname, lastname, email, password, role } = req.body;
  console.log("Request body:", req.body); // Log the incoming request body

  // Validate role
  if (role !== "Admin" && role !== "User") {
    console.log("Invalid role:", role); // Log the role if it's invalid
    return res
      .status(400)
      .json({ message: "Invalid role. Role must be 'admin' or 'user'." });
  }

  // Check if user already exists
  const checkUserQuery = "SELECT * FROM users WHERE email = ?";
  console.log("Checking if user exists with email:", email); // Log the email being checked
  db.query(checkUserQuery, [email], (err, result) => {
    if (err) {
      console.error("Error checking user:", err); // Log any error during the check
      return res.status(500).json({ error: "Server error" });
    }

    console.log("Check user result:", result); // Log the result of the user check
    if (result.length > 0) {
      console.log("User already exists with email:", email); // Log if user already exists
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash the password
    console.log("Hashing password for user:", email); // Log before hashing
    bcrypt.hash(password, 10, (err, hashedPassword) => {
      if (err) {
        console.error("Error hashing password:", err); // Log any error during hashing
        return res.status(500).json({ error: "Server error" });
      }

      console.log("Hashed password:", hashedPassword); // Log the hashed password (DO NOT log sensitive data in production)

      // SQL query to insert the new user
      const insertQuery =
        "INSERT INTO users (firstname, lastname, email, password, role) VALUES (?, ?, ?, ?, ?)";
      console.log("Executing insert query with values:", [
        firstname,
        lastname,
        email,
        hashedPassword,
        role,
      ]); // Log the values to be inserted

      db.query(
        insertQuery,
        [firstname, lastname, email, hashedPassword, role],
        (err, result) => {
          if (err) {
            console.error("Error inserting user:", err); // Log any error during insertion
            return res.status(500).json({ error: "Failed to register user" });
          }

          console.log("User inserted successfully:", result); // Log the successful insert result
          res.status(201).json({
            message: "User registered successfully",
            userId: result.insertId,
          });
        }
      );
    });
  });
};
exports.loginAdmin = async (req, res) => {
  const { email, password, role } = req.body;

  try {
    // Query to find the user by email
    const query = "SELECT * FROM users WHERE email = ?";
    db.query(query, [email], async (err, result) => {
      if (err) {
        console.error("Error finding user:", err); // Log the error during the query
        return res.status(500).json({ message: "Server error" });
      }

      if (result.length === 0) {
        return res.status(400).json({ message: "User not found" });
      }

      const user = result[0]; // The user is returned as an array of results, pick the first one.
      console.log(user.role);
      // Check if the role is 'admin' and if the role matches
      if (user.role !== role) {
        return res
          .status(400)
          .json({ message: "You are not allowed to login from here" });
      }

      // Compare the provided password with the hashed password stored in the database
      const isPasswordMatch = await bcrypt.compare(password, user.password);
      if (!isPasswordMatch) {
        return res.status(400).json({ message: "Invalid password" });
      }

      // Create a JWT token (or any other method for session handling)
      const token = jwt.sign(
        { userId: user.id, role: user.role },
        "secretkey",
        { expiresIn: "1h" }
      );

      // Send success response with the token
      res.status(200).json({
        message: "Login successful",
        token,
        role: user.role, // Send the role to the frontend to check
      });
    });
  } catch (err) {
    console.error("Server error:", err);
    res.status(500).json({ message: "Server error" });
  }
};
exports.loginUser = async (req, res) => {
  const { email, password, role } = req.body;

  const query = "SELECT * FROM users WHERE email = ?";
  db.query(query, [email], async (err, result) => {
    if (err || result.length === 0) {
      return res.status(400).json({ message: "User not found" });
    }

    const user = result[0];
    if (user.role !== role) {
      return res
        .status(403)
        .json({ message: "You are not allowed to login from here." });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(400).json({ message: "Invalid password" });
    }

    const token = jwt.sign({ userId: user.id, role: user.role }, "secretkey", {
      expiresIn: "1h",
    });

    res
      .status(200)
      .json({ message: "Login successful", token, role: user.role });
  });
};
