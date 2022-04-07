const express = require('express');
const authControllers = require('../controllers/authControllers');
const authMiddlewares = require('../middlewares/authMiddlewares');

const router = express.Router();

router.route('/signup').post(authControllers.createUser);
router.route('/login').post(authControllers.loginUser);
router.route('/logout').get(authControllers.logoutUser);
router.route('/dashboard').get(authMiddlewares, authControllers.getDashboardPage);

module.exports = router;
