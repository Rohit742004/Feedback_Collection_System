import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

import "../styles/Dashboard.css";

function Dashboard() {

  const navigate = useNavigate();

  return (
    <>

      <Navbar />

      <div className="dashboard-container">

        <div className="dashboard-header">

          <h1 className="dashboard-title">
            Feedback Collection System
          </h1>

          <p className="dashboard-subtitle">
            Manage feedback submissions and
            analyze faculty performance
            efficiently.
          </p>

        </div>

        <div className="card-container">

          <div className="dashboard-card">

            <div className="card-icon">
              📝
            </div>

            <h2>Submit Feedback</h2>

            <p>
              Submit feedback regarding faculty
              teaching performance and classroom
              experience.
            </p>

            <button
              onClick={() => navigate("/feedback")}
            >
              Open
            </button>

          </div>

          <div className="dashboard-card">

            <div className="card-icon">
              📊
            </div>

            <h2>Admin Dashboard</h2>

            <p>
              View analytics, charts, feedback
              statistics, and manage submitted
              responses.
            </p>

            <button
              onClick={() => navigate("/admin")}
            >
              Open
            </button>

          </div>

        </div>

      </div>

    </>
  );
}

export default Dashboard;