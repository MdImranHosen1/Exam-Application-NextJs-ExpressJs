const mongoose = require("mongoose");

const QuestionVivaSchema = mongoose.Schema({
    question: {
        type: String,
        required: true,
    },
    solution: {
        type: String,
        required: true,
    },
    code: {
        type: String,
        required: false,
    },
    subjectName: {
        type: String,
        required: true,
    },
    hints: {
        type: String,
    },
});

module.exports = mongoose.model('questionsVivas', QuestionVivaSchema);
