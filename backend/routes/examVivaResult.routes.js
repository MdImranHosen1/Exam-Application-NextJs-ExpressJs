const express = require("express");
const router = express.Router();
const Result = require("../models/result.viva.model");

router.use(express.json());

// POST route to save exam results
router.post("/", async (req, res) => {
  try {
 
    const {
      questions,
      codes,
      reviewSolutions,
      answersTaken,
      totalTime,
      screenshot,
      records,
    } = req.body;

    const result = new Result({
      questions,
      codes,
      reviewSolutions,
      answersTaken,
      totalTime,
      screenshot,
      records,
    });

    await result.save();
    res.status(201).json({ message: "Exam results saved successfully" });
  } catch (error) {
    console.error("Error saving exam results:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/:id", async (req, res) => {
  const id = req.params.id
  try {
    const examResult = await Result.findById({_id:id})
    res.status(200).json(examResult);
  } catch (error) {
    console.error("Error fetching exam results:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});


router.get("/", async (req, res) => {
  try {
    const examResults = await Result.find({}, '_id totalTime createdAt');
    res.status(200).json(examResults);
  } catch (error) {
    console.error("Error fetching exam results:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});
module.exports = router;
