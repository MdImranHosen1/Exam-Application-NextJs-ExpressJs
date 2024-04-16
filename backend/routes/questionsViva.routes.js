const express = require("express");
const router = express.Router();
const questionsViva = require("../models/question.viva.model");

// Middleware to parse form-encoded bodies
router.use(express.urlencoded({ extended: true }));
router.use(express.json());

router.get("/", async (req, res) => {
  try {
    const data = await questionsViva.find();
    res.status(201).json(data);
  } catch (error) {
    res.send(404).json({
      Error: "Error Occur On Get all questions",
      error,
    });
  }
});

// get a single question by the id
router.get("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const data = await questionsViva.find({ _id: id });
    res.status(201).json(data);
  } catch (error) {
    res.send(404).json({
      Error: "Error Occur On Get  question",
      error,
    });
  }
});

// Update the single question by id
router.put("/:id", async (req, res) => {
  const id = req.params.id;
  const { question, solution, code, subjectName } = req.body; // Assuming these fields are sent in the request body

  try {
    await questionsViva.findOneAndUpdate(
      { _id: id },
      { $set: { question, solution, code, subjectName } }
    );

    res.status(200).json({ message: "Question updated successfully" });
  } catch (error) {
    res.status(500).json({
      Error: "Error Occurred While Updating Question",
      error,
    });
  }
});

// simillar subject all question get by the subject id
router.get("/subject/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const data = await questionsViva.find({ subjectName: id });
    res.status(200).json(data);
  } catch (error) {
    res.status(404).json({
      Error: "Error Occurred While Getting Questions",
      error,
    });
  }
});


router.post("/", async (req, res) => {
  try {
    const data = new questionsViva(req.body);
    await data.save();
    res.status(201).json(data);
  } catch (error) {
    console.error("Error handling request:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
