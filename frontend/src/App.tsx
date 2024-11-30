import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useNavigate,
} from "react-router-dom";
import Cookies from "js-cookie"; // Import js-cookie
import Home from "./Component/Home";
import "bootstrap/dist/css/bootstrap.min.css";
import LoginAdmin from "./Pages/LoginAdmin";
import LoginUser from "./Pages/LoginUser";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MainPage from "./Pages/mainPage";

// Navbar Component
const NavbarComponent: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Remove cookies or tokens
    Cookies.remove("token"); // Assuming your token is stored as "token"
    Cookies.remove("role"); // Assuming the role is stored as "role"

    // Show a toast notification
    toast.success("Logged out successfully!", {
      position: "top-center",
    });

    // Redirect to the home page
    navigate("/");
  };

  return (
    <>
      <style>
        {`
          .custom-brand {
            font-weight: bold;
            font-family: 'Techerudite', sans-serif;
            font-size: 2rem;
            text-transform: uppercase;
            color: #1e2a47;
            letter-spacing: 2px;
            transition: color 0.3s ease, transform 0.3s ease, text-shadow 0.3s ease;
            text-shadow: 2px 2px 6px rgba(0, 0, 0, 0.4);
            animation: fadeIn 1.5s ease-out;
          }

          .custom-brand:hover {
            color: #f39c12;
            transform: scale(1.1);
            text-decoration: underline;
          }

          .custom-brand:active {
            color: #e74c3c;
            transform: scale(1);
            text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.6);
          }

          @keyframes fadeIn {
            0% {
              opacity: 0;
              transform: translateY(-10px);
            }
            100% {
              opacity: 1;
              transform: translateY(0);
            }
          }

          .custom-brand:hover {
            text-shadow: 0 0 20px rgba(243, 156, 18, 0.7), 0 0 30px rgba(243, 156, 18, 0.7);
          }
        `}
      </style>

      <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm">
        <div className="container-fluid">
          <Link className="navbar-brand custom-brand" to="/">
            Techerudite
          </Link>
          <div className="d-flex">
            <button
              className="btn btn-danger"
              type="button"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        </div>
      </nav>
    </>
  );
};

function App() {
  return (
    <>
      <Router>
        <NavbarComponent />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/LoginAdmin" element={<LoginAdmin />} />
          <Route path="/LoginUser" element={<LoginUser />} />
          <Route path="/mainPage" element={<MainPage />} />
        </Routes>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
