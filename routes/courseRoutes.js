const express = require('express');
const courseControllers = require('../controllers/courseControllers');

const router = express.Router();

router.route('/').post(courseControllers.createCourse);
router.route('/').get(courseControllers.getAllCourses);
router.route('/:slug').get(courseControllers.getCourse);

module.exports = router;
