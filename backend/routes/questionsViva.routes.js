const express = require('express');
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
            'Error': 'Error Occur On Get all questions', error
        })

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
