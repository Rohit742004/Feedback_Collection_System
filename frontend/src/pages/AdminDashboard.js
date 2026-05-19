import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
} from "recharts";

import "../styles/AdminDashboard.css";

function AdminDashboard() {

  const [feedbacks, setFeedbacks] = useState([]);
  const [search, setSearch] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  const fetchFeedbacks = async () => {

    try {

      const res = await axios.get(
        "http://localhost:5000/api/feedback"
      );

      setFeedbacks(res.data);

    } catch (error) {

      console.log(error);

      alert("Failed to fetch feedbacks");

    }

  };

  const deleteFeedback = async (id) => {

    try {

      await axios.delete(
        `http://localhost:5000/api/feedback/${id}`
      );

      fetchFeedbacks();

    } catch (error) {

      console.log(error);

    }

  };

  const totalFeedbacks = feedbacks.length;

  const averageRating =
    feedbacks.length > 0
      ? (
          feedbacks.reduce(
            (sum, item) => sum + item.rating,
            0
          ) / feedbacks.length
        ).toFixed(1)
      : 0;

  const totalFaculties = new Set(
    feedbacks.map((item) => item.facultyName)
  ).size;

  const ratingData = [
    {
      name: "5 Star",
      value: feedbacks.filter(
        (f) => f.rating === 5
      ).length,
    },

    {
      name: "4 Star",
      value: feedbacks.filter(
        (f) => f.rating === 4
      ).length,
    },

    {
      name: "3 Star",
      value: feedbacks.filter(
        (f) => f.rating === 3
      ).length,
    },

    {
      name: "2 Star",
      value: feedbacks.filter(
        (f) => f.rating === 2
      ).length,
    },

    {
      name: "1 Star",
      value: feedbacks.filter(
        (f) => f.rating === 1
      ).length,
    },
  ];

  return (
    <>

      <Navbar />

      <div className="admin-container">

        <h1 className="admin-title">
          Admin Dashboard
        </h1>

        <button
          className="back-btn"
          onClick={() => navigate("/dashboard")}
        >
          Back to Dashboard
        </button>

        <div className="stats-container">

          <div className="stat-card">
            <h2>{totalFeedbacks}</h2>
            <p>Total Feedbacks</p>
          </div>

          <div className="stat-card">
            <h2>{averageRating}</h2>
            <p>Average Rating</p>
          </div>

          <div className="stat-card">
            <h2>{totalFaculties}</h2>
            <p>Total Faculties</p>
          </div>

        </div>

        <input
          type="text"
          placeholder="Search by faculty or student"
          className="search-input"
          onChange={(e) => setSearch(e.target.value)}
        />

        <div className="chart-container">

          <h2>Faculty Ratings Chart</h2>

          <ResponsiveContainer width="100%" height={300}>

            <BarChart data={feedbacks}>

              <CartesianGrid strokeDasharray="3 3" />

              <XAxis dataKey="facultyName" />

              <YAxis />

              <Tooltip />

              <Legend />

              <Bar
                dataKey="rating"
                fill="#6a11cb"
              />

            </BarChart>

          </ResponsiveContainer>

        </div>

        <div className="pie-chart-container">

          <h2>Rating Distribution</h2>

          <PieChart width={450} height={320}>

            <Pie
              data={ratingData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={110}
              fill="#6a11cb"
              label={({ name, value }) =>
                `${name}: ${value}`
              }
            />

            <Tooltip />

            <Legend />

          </PieChart>

        </div>

        <div className="feedback-list">

          {feedbacks.length === 0 ? (

            <p>No Feedback Available</p>

          ) : (

            feedbacks
              .filter(
                (item) =>

                  (item.facultyName || "")
                    .toLowerCase()
                    .includes(search.toLowerCase()) ||

                  (item.studentName || "")
                    .toLowerCase()
                    .includes(search.toLowerCase())

              )
              .map((feedback) => (

                <div
                  className="feedback-card"
                  key={feedback._id}
                >

                  <h3>{feedback.studentName}</h3>

                  <p>
                    <strong>Faculty:</strong>{" "}
                    {feedback.facultyName}
                  </p>

                  <p>
                    <strong>Subject:</strong>{" "}
                    {feedback.subject}
                  </p>

                  <p>
                    <strong>Rating:</strong>{" "}
                    {feedback.rating}
                  </p>

                  <p>
                    <strong>Comments:</strong>{" "}
                    {feedback.comments}
                  </p>

                  {feedback.createdAt && (
                    <p>
                      <strong>Submitted:</strong>{" "}
                      {new Date(
                        feedback.createdAt
                      ).toLocaleString()}
                    </p>
                  )}

                  <button
                    className="delete-btn"
                    onClick={() =>
                      deleteFeedback(feedback._id)
                    }
                  >
                    Delete
                  </button>

                </div>

              ))

          )}

        </div>

      </div>

    </>
  );
}

export default AdminDashboard;