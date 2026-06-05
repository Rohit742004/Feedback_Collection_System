import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function RequireAdmin({ children }) {
  const navigate = useNavigate();
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    const verified = localStorage.getItem("adminVerified") === "true";
    if (!verified) {
      alert("Admin verification required");
      navigate("/admin-login");
      return;
    }
    setAllowed(true);
  }, [navigate]);

  if (!allowed) {
    return null;
  }

  return children;
}

export default RequireAdmin;
