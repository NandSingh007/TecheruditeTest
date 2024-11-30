import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import styles from "./MainPage.module.css";

const MainPage = () => {
  const [role, setRole] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const userRole = Cookies.get("role");
    const token = Cookies.get("token");

    // Redirect to "/" if token or role is not available
    if (!token || !userRole) {
      navigate("/");
      return;
    }

    setRole(userRole); 
  }, [navigate]);

  return (
    <div className={styles.container}>
      <div>
        <h1 className={styles.header}>Welcome as {role}</h1>
        <p className={styles.subtext}>
          Manage your system with ease and efficiency
        </p>
      </div>
    </div>
  );
};

export default MainPage;
