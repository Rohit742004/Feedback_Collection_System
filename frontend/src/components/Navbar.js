import { useNavigate } from "react-router-dom";

import "../styles/Navbar.css";

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("adminVerified");
    localStorage.removeItem("adminName");
    navigate("/");
  };

  return (
    <div className="navbar">

      <div className="logo">
        Feedback System
      </div>

      <div className="nav-links">

        <button onClick={() => navigate("/dashboard")}>
          Dashboard
        </button>

        <button onClick={() => navigate("/feedback")}>
          Feedback
        </button>

        <button onClick={() => navigate("/admin-login")}> 
          Admin
        </button>

        <button onClick={handleLogout}>
          Logout
        </button>

      </div>

    </div>
  );
}

export default Navbar;