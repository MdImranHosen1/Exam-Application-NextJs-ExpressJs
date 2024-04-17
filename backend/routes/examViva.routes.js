const express = require("express");
const router = express.Router();
const questionsViva = require("../models/question.viva.model");
const Subjects = require("../models/subject.model");

// Middleware to parse form-encoded bodies
router.use(express.urlencoded({ extended: true }));
router.use(express.json());

router.get("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const subjectsQuestions = {};
    const subjects = await Subjects.find();
    for (const subject of subjects) {
      const subjectQuestions = await questionsViva.find({
        subjectName: subject._id,
      });
      const shuffledQuestions = subjectQuestions.sort(
        () => Math.random() - 0.5
      );
      const selectedQuestions = shuffledQuestions.slice(
        0,
        Math.min(subject.name === 'Programming'?1:id, shuffledQuestions.length)
      );
      subjectsQuestions[subject.name] = [];
      if (subject.name === 'HR') {
        for (const qs of selectedQuestions) {
          if (qs._id != '6615a7d23e2adfb29dff966d') {
            subjectsQuestions[subject.name].push(qs);
          }
        }
      }
      else {
        subjectsQuestions[subject.name] = selectedQuestions;
      }

    }

    const additionalQuestions = await questionsViva.find({
      _id: "6615a7d23e2adfb29dff966d",
    });

    subjectsQuestions["HR"].push(additionalQuestions[0]);


    res.json(subjectsQuestions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
