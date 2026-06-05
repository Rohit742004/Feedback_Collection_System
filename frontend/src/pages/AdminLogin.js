import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import "../styles/Login.css";

function AdminLogin() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:5000/api/admin/login",
        formData
      );

      localStorage.setItem("adminVerified", "true");
      localStorage.setItem("adminName", res.data.name || "Admin");
      alert(res.data.message || "Admin verified successfully");
      navigate("/admin");
    } catch (error) {
      alert(error.response?.data?.message || "Admin verification failed");
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h1>Admin Login</h1>
        <p className="login-subtitle">
          Verify admin access before opening the admin dashboard.
        </p>

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Enter Admin Email"
            value={formData.email}
            onChange={handleChange}
          />

          <input
            type="password"
            name="password"
            placeholder="Enter Password"
            value={formData.password}
            onChange={handleChange}
          />

          <button type="submit">Verify Admin</button>

          <p className="auth-text">
            Back to
            <span onClick={() => navigate("/")}> Login</span>
          </p>
        </form>
      </div>
    </div>
  );
}

export default AdminLogin;
