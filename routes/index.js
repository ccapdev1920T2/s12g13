const express = require('express');
const router = express.Router();

const controller = require('../controllers/index.js');

/* GET home page. */
router.get('/', controller.getIndex);
router.post('/register', controller.postRegister);
router.post('/forgot', controller.postForgot);
router.post('/', controller.postLogin)
router.get('/main', controller.getMain);

module.exports = router;