'use strict';

const express = require('express');
const router = express.Router();

// 1) Lista de tag: GET ruta /api/tag 
router.get('/', async (req, res, next) => {
    try {
        res.json([{ tag: ["work", "lifestyle", "motor", "mobile"] }]);
    } catch (err) { // gestión del error!
        next(err); // nos lleva a "error handler" del app.js
    }
});

module.exports = router;