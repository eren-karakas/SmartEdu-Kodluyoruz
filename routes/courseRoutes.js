const express = require('express');
const courseControllers = require('../controllers/courseControllers');
const roleMiddlewares = require('../middlewares/roleMiddlewares');

const router = express.Router();

router.route('/').post(roleMiddlewares(['teacher', 'admin']), courseControllers.createCourse);
router.route('/').get(courseControllers.getAllCourses);
router.route('/:slug').get(courseControllers.getCourse);
router.route('/enroll').post(courseControllers.enrollCourse);
router.route('/release').post(courseControllers.releaseCourse);
router.route('/:slug').delete(courseControllers.deleteCourse);
router.route('/:slug').put(courseControllers.updateCourse);

module.exports = router;
