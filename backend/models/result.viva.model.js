const mongoose = require("mongoose");

// Define examData schema
const resultSchema = new mongoose.Schema({
  questions: [String],
  codes: [String],
  reviewSolutions: [String],
  answersTaken: [Number],
  totalTime: Number,
  screenshot: [String],
  records: [Buffer],
},
  { timestamps: true }
);

// Create examData model
module.exports = mongoose.model("results", resultSchema);
