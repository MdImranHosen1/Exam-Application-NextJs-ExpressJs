// const mongoose = require("mongoose");

// const ImageSchema = new mongoose.Schema({
//   // Define properties of image schema if needed
// });

// const RecordingSchema = new mongoose.Schema({
//   // Define properties of voice recording schema if needed
// });

// // Define the main schema
// const ResultSchema = new mongoose.Schema({
//   capturedImages: [ImageSchema], // List of images
//   codes: [String], // List of strings (codes)
//   questions: [String], // List of strings (questions)
//   recordings: [RecordingSchema], // List of voice recordings
//   reviewSolutions: [String], // List of strings (review solutions)
//   timeTaken: [Number], // List of numbers (time taken)
//   totalTimeTaken: { type: Date, default: Date.now }, // Total time taken (timestamp)
// });

// // Create model from schema
// const Result = mongoose.model("Result", ResultSchema);

// module.exports = Result;

const mongoose = require("mongoose");
const resultSchema = new mongoose.Schema({
  audio: {
    data: Buffer,
    contentType: String,
  },
  image: {
    data: Buffer,
    contentType: String,
  },
});
module.exports = mongoose.model("ResultViva", resultSchema);
