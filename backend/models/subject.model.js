const mongoose = require("mongoose");

const SubjectSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    }
});
module.exports = mongoose.model('subjects', SubjectSchema);
