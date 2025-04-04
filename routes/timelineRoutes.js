const express = require('express');
const router = express.Router();
const timelineController = require('../controllers/timelineController');

router.get('/', timelineController.getFilmesTimeline);

module.exports = router;