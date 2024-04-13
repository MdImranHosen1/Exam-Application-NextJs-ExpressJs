const express = require("express");
const router = express.Router();
const Result = require("../models/result.viva.model");
const multer = require("multer");


// Middleware to parse form-encoded bodies
router.use(express.urlencoded({ extended: true }));
router.use(express.json());

router.post("/", async (req, res) => {
  "/api/saveResult",
  upload.fields([
    { name: "audio", maxCount: 1 },
    { name: "screenshot", maxCount: 1 },
  ]),
  async (req, res) => {
    try {
      const newResult = new Result({
        audio: {
          data: req.files["audio"][0].buffer,
          contentType: req.files["audio"][0].mimetype,
        },
        image: {
          data: req.files["screenshot"][0].buffer,
          contentType: req.files["screenshot"][0].mimetype,
        },
      });
      await newResult.save();
      res.json({ message: "Result saved successfully" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Failed to save result" });
    }
  }
});

module.exports = router;
