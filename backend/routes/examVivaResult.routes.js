const express = require("express");
const router = express.Router();
const Result = require("../models/result.viva.model");

// Middleware to parse form-encoded bodies
router.use(express.urlencoded({ extended: true }));
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
    const result = new Results({
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

// GET route to retrieve all exam results
router.get("/", async (req, res) => {
  try {
    // Retrieve all exam results from the database
    const examResults = await Results.find();

    // Send the exam results as a response
    res.status(200).json(examResults);
  } catch (error) {
    // Handle errors
    console.error("Error fetching exam results:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
