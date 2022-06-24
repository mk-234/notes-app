const express = require('express');
const controller = require('../controllers/controller');
const router = express.Router();


router.post('/save', controller.saveNote);
router.post('/getnotes', controller.getAllNotes);

module.exports = router;