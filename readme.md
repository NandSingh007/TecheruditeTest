# My React and Node.js Application

This project is a full-stack web application built with React.js for the frontend, Node.js and Express.js for the backend, and MySQL for the database. The application includes customer and admin registration pages with authentication features, and an admin login page.

## Features

- **Customer Registration Page**: Allows users to register as customers with the fields: First Name, Last Name, Email, and Password. Customers are assigned a `customer` role.
- **Admin Registration Page**: Allows users to register as admins with the fields: First Name, Last Name, Email, and Password. Admins are assigned an `admin` role.
- **Email Verification**: The registration process for both customers and admins includes email verification for authentication.
- **Admin Login Page**: Admins can log in using their email and password.
- **Error Handling**: If a customer tries to log in on the admin login page, an error message "You are not allowed to login from here" will be shown.

## Folder Structure

### Frontend (React.js)

frontend/ ├── src/ │ ├── components/ # Reusable components (e.g., buttons, forms) │ └── pages/ # Pages of the application (e.g., registration, login) ├── public/ # Static files (e.g., images, favicon) ├── package.json # Frontend dependencies └── .gitignore # Git ignore file for frontend

- **`components/`**: Contains all reusable React components like buttons, form inputs, etc.
- **`pages/`**: Contains the React components representing different pages of the app, such as the customer and admin registration pages, and the admin login page.

### Backend (Node.js and Express.js)

backend/ ├── config/ # Configuration files (e.g., database, authentication) ├── controllers/ # Controller functions to handle business logic ├── modals/ # MySQL database models or schemas ├── routers/ # Express routes for handling API requests ├── app.js # Main entry point for the Node.js application ├── package.json # Backend dependencies └── .gitignore # Git ignore file for backend

- **`config/`**: Contains configuration files like database connection settings (MySQL) and environment variables.
- **`controllers/`**: Contains logic for handling requests from the frontend (e.g., user registration, login).
- **`modals/`**: Contains the database models (e.g., user schema).
- **`routers/`**: Contains Express routes for different API endpoints (e.g., `/register`, `/login`).
- **`app.js`**: The main entry point for the backend application that initializes the server and connects to the database.

## Technologies Used

- **Frontend**: React.js, React Router, Axios
- **Backend**: Node.js, Express.js, MySQL, bcryptjs, JWT (JSON Web Token)
- **Database**: MySQL
- **Authentication**: Email verification using nodemailer, password encryption using bcryptjs

## Installation

### Frontend Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/your-repository-name.git
   ```

# Navigate to frontend directory

cd frontend

# Install frontend dependencies

npm install

# Start React frontend

npm start

# Navigate to backend directory

cd ../backend

# Install backend dependencies

npm install
