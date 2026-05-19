import { useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";

import "../styles/FeedbackForm.css";

function FeedbackForm() {

  const navigate = useNavigate();

  // =========================
  // Faculty Dataset
  // =========================
  const facultyData = [
    {
      name: "prof. Nita kulkarni mam",
      subject: "Data Structures",
    },
    {
      name: "Prof. rashmi mam",
      subject: "Operating Systems",
    },
    {
      name: "Dr upk sir",
      subject: "Database Management System",
    },
  
  ];

  const [formData, setFormData] = useState({
    studentName: "",
    facultyName: "",
    subject: "",
    rating: "",
    comments: "",
  });

  // =========================
  // Handle Input Change
  // =========================
  const handleChange = (e) => {

    const { name, value } = e.target;

    // Faculty Dropdown Selection
    if (name === "facultyName") {

      const selectedFaculty =
        facultyData.find(
          (faculty) => faculty.name === value
        );

      setFormData({
        ...formData,
        facultyName: value,
        subject: selectedFaculty?.subject || "",
      });

      return;
    }

    setFormData({
      ...formData,
      [name]:
        name === "rating"
          ? Number(value)
          : value,
    });
  };

  // =========================
  // Submit Feedback
  // =========================
  const handleSubmit = async (e) => {

    e.preventDefault();

    if (
      !formData.studentName ||
      !formData.facultyName ||
      !formData.subject ||
      !formData.rating
    ) {

      alert("Please fill all required fields");

      return;
    }

    try {

      const res = await axios.post(
        "http://localhost:5000/api/feedback",
        formData
      );

      alert(
        res.data.message ||
        "Feedback Submitted Successfully"
      );

      // Reset Form
      setFormData({
        studentName: "",
        facultyName: "",
        subject: "",
        rating: "",
        comments: "",
      });

    } catch (error) {

      alert(
        error.response?.data?.message ||
        "Submission Failed"
      );

    }
  };

  return (
    <>

      <Navbar />

      <div className="feedback-container">

        <div className="feedback-box">

          <button
            className="back-btn"
            onClick={() => navigate("/dashboard")}
          >
            Back to Dashboard
          </button>

          <h1>Faculty Feedback Form</h1>

          <form onSubmit={handleSubmit}>

            {/* Student Name */}
            <label>
              Student Name
            </label>

            <input
              type="text"
              name="studentName"
              placeholder="Enter Student Name"
              value={formData.studentName}
              onChange={handleChange}
            />

            {/* Faculty Dropdown */}
            <label>
              Select Faculty
            </label>

            <select
              name="facultyName"
              value={formData.facultyName}
              onChange={handleChange}
            >

              <option value="">
                Select Faculty
              </option>

              {facultyData.map((faculty, index) => (

                <option
                  key={index}
                  value={faculty.name}
                >
                  {faculty.name}
                </option>

              ))}

            </select>

            {/* Subject Auto Filled */}
            <label>
              Subject
            </label>

            <input
              type="text"
              name="subject"
              value={formData.subject}
              readOnly
            />

            {/* Rating */}
            <label>
              Rating
            </label>

            <select
              name="rating"
              value={formData.rating}
              onChange={handleChange}
            >

              <option value="">
                Select Rating
              </option>

              <option value="1">
                1 Star
              </option>

              <option value="2">
                2 Stars
              </option>

              <option value="3">
                3 Stars
              </option>

              <option value="4">
                4 Stars
              </option>

              <option value="5">
                5 Stars
              </option>

            </select>

            {/* Comments */}
            <label>
              Comments
            </label>

            <textarea
              name="comments"
              placeholder="Enter Comments"
              value={formData.comments}
              onChange={handleChange}
            />

            {/* Submit Button */}
            <button
              type="submit"
              className="submit-btn"
            >
              Submit Feedback
            </button>

          </form>

        </div>

      </div>

    </>
  );
}

export default FeedbackForm;