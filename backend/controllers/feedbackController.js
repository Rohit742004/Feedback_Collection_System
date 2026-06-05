const Feedback = require("../models/Feedback");

const submitFeedback = async (req, res) => {

  try {

    const {
      studentName,
      facultyName,
      subject,
      rating,
      comments,
    } = req.body;

    const feedback = new Feedback({
      studentName,
      facultyName,
      subject,
      rating,
      comments,
    });

    await feedback.save();

    res.status(201).json({
      message: "Feedback Submitted Successfully",
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });

  }

};

const getAllFeedbacks = async (req, res) => {

  try {

    const feedbacks = await Feedback.find();

    res.status(200).json(feedbacks);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });

  }

};

const deleteFeedback = async (req, res) => {

  try {

    const { id } = req.params;

    const result = await Feedback.findByIdAndDelete(id);

    if (!result) {
      return res.status(404).json({ message: "Feedback not found" });
    }

    res.status(200).json({ message: "Feedback deleted successfully" });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });

  }

};

module.exports = {
  submitFeedback,
  getAllFeedbacks,
  deleteFeedback,
};