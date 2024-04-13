const express = require("express");
const router = express.Router();
const Result = require("../models/result.viva.model");

router.use(express.json());

// POST route to save exam results
router.post("/", async (req, res) => {
  try {
    // Extract data from the request body
    const {
      questions,
      codes,
      reviewSolutions,
      answersTaken,
      totalTime,
      screenshot,
      records,
    } = req.body;

    // Create a new instance of the results model

    const result = new Result({
      questions,
      codes,
      reviewSolutions,
      answersTaken,
      totalTime,
      screenshot,
      records,
    });

    // Save the data to the database
    await result.save();

    // Send a success response
    res.status(201).json({ message: "Exam results saved successfully" });
  } catch (error) {
    // Handle errors
    console.error("Error saving exam results:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/", async (req, res) => {
  try {
    const examResults = await Result.find();
    res.status(200).json(examResults);
  } catch (error) {
    console.error("Error fetching exam results:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
