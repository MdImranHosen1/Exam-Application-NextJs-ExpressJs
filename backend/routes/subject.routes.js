const express = require('express');
const router = express.Router();
const subject = require("../models/subject.model");

// Middleware to parse form-encoded bodies
router.use(express.urlencoded({ extended: true }));


router.get("/", async (req, res) => {
    try {
        const data = await subject.find();
        res.status(201).json(data);
    } catch (error) {
        res.send(404).json({
            'Error': 'Error Occur On Get all subject', error
        })

    }
});

router.post("/", async (req, res) => {

    try {
        const data = new subject(req.body);
        await data.save();
        res.status(201).json(data);
    } catch (error) {
        console.error("Error handling request:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});



module.exports = router;
