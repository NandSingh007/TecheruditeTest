import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate, Link } from "react-router-dom";
import Cookies from "js-cookie";

const Registration = () => {
  const [role, setRole] = useState("User"); // Default role
  const navigate = useNavigate();

  useEffect(() => {
    const token = Cookies.get("token");
    const userRole = Cookies.get("role");

    if (token && userRole) {
      if (userRole === "admin") {
        navigate("/mainPage");
      } else if (userRole === "user") {
        navigate("/mainPage");
      }
    }
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData(e.target as HTMLFormElement);
    const data = Object.fromEntries(formData.entries());
    console.log("Form Data:", data); // Log form data

    try {
      const response = await axios.post("http://localhost:5000/register", data);

      if (response.status === 201) {
        toast.success("User registered successfully!", {
          position: "top-center",
        });

        if (role === "User") {
          navigate("/LoginUser");
        } else if (role === "Admin") {
          navigate("/LoginAdmin");
        }
      }
    } catch (error: any) {
      // Handle errors
      if (error.response) {
        toast.error(error.response.data.message || "Server error", {
          position: "top-center",
        });
      } else if (error.request) {
        toast.error("Network error. Please try again later.", {
          position: "top-center",
        });
      } else {
        toast.error("Error occurred. Please try again.", {
          position: "top-center",
        });
      }
    }
  };

  return (
    <div className="container my-5">
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-5">
          <div className="card shadow">
            <div className="card-header bg-primary text-white text-center">
              <h3>
                {role === "User" ? "User Registration" : "Admin Registration"}
              </h3>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                {/* Role Selection */}
                <div className="mb-3">
                  <label className="form-label fw-bold">Register As:</label>
                  <div className="d-flex justify-content-around">
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="role"
                        id="user"
                        value="User"
                        checked={role === "User"}
                        onChange={() => setRole("User")}
                      />
                      <label className="form-check-label" htmlFor="user">
                        User
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="role"
                        id="admin"
                        value="Admin"
                        checked={role === "Admin"}
                        onChange={() => setRole("Admin")}
                      />
                      <label className="form-check-label" htmlFor="admin">
                        Admin
                      </label>
                    </div>
                  </div>
                </div>

                {/* First Name */}
                <div className="mb-3">
                  <label htmlFor="firstName" className="form-label fw-bold">
                    First Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="firstName"
                    name="firstname"
                    required
                  />
                </div>

                {/* Last Name */}
                <div className="mb-3">
                  <label htmlFor="lastName" className="form-label fw-bold">
                    Last Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="lastName"
                    name="lastname"
                    required
                  />
                </div>

                {/* Email */}
                <div className="mb-3">
                  <label htmlFor="email" className="form-label fw-bold">
                    Email
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    name="email"
                    required
                  />
                </div>

                {/* Password */}
                <div className="mb-3">
                  <label htmlFor="password" className="form-label fw-bold">
                    Password
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    name="password"
                    required
                  />
                </div>

                {/* Hidden Role Field */}
                <input type="hidden" name="role" value={role} />

                {/* Submit Button */}
                <div className="d-grid">
                  <button type="submit" className="btn btn-primary">
                    Register
                  </button>
                </div>
              </form>

              {/* Links for Login */}
              <div className="mt-3 text-center">
                <p>
                  <Link to="/LoginAdmin" className="text-decoration-none">
                    Login as Admin
                  </Link>{" "}
                  | |{" "}
                  <Link to="/LoginUser" className="text-decoration-none">
                    Login as User
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Registration;
