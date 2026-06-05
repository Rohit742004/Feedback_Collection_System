const express = require("express");

const router = express.Router();

const {
  submitFeedback,
  getAllFeedbacks,
  deleteFeedback,
} = require("../controllers/feedbackController");

router.post("/", submitFeedback);

router.get("/", getAllFeedbacks);

router.delete("/:id", deleteFeedback);

module.exports = router;