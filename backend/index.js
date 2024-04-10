const express = require("express");
const cors = require("cors");
const app = express();
const dotenv = require('dotenv');

// Routes
const questionsVivaRoutes = require("./routes/questionsViva.routes");
const subjectRoutes = require("./routes/subject.routes");
const examVivaRoutes = require("./routes/examViva.routes");
const profileRoutes = require("./routes/profile.routes");
dotenv.config();

require('./config/db');

PORT = process.env.PORT || 3000;
app.use(cors());


app.use("/subjects/", subjectRoutes);
app.use("/questions/viva/", questionsVivaRoutes);
app.use("/exam/viva/", examVivaRoutes);
// app.use("/profile/", profileRoutes);

app.get("/", (req, res) => {
    res.send("Root Route");
})


app.listen(PORT, () => {
    console.log(`Server Running at: http://localhost:${PORT}`)
})
