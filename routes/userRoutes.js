const express = require('express');
const authControllers = require('../controllers/authControllers');

const router = express.Router();

router.route('/signup').post(authControllers.createUser);
router.route('/login').post(authControllers.loginUser);

module.exports = router;
