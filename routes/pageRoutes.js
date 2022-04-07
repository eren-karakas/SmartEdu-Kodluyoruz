const express = require('express');
const pageControllers = require('../controllers/pageControllers');
const redirectMiddlewares = require('../middlewares/redirectMiddlewares');

const router = express.Router();

router.route('/').get(pageControllers.getIndexPage);
router.route('/about').get(pageControllers.getAboutPage);
router.route('/register').get(redirectMiddlewares, pageControllers.getRegisterPage);
router.route('/login').get(redirectMiddlewares, pageControllers.getLoginPage);

module.exports = router;
