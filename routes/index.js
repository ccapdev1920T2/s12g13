const express = require('express');
const router = express.Router();

const {checkAuthenticated, checkNotAuthenticated} = require('../authentication.js');
const controller = require('../controllers/index.js');

/* GET home page. */
router.get('/', checkAuthenticated, controller.getIndex);
router.get('/main', checkNotAuthenticated, controller.getMain);
router.get('/getUser', checkNotAuthenticated, controller.getUser);
router.get('/getLeaders', checkNotAuthenticated, controller.getLeaders);
router.get('/getMonsters', checkNotAuthenticated, controller.getMonsters);
router.get('/getWeapons', checkNotAuthenticated, controller.getWeapons);
router.get('/getConsumables', checkNotAuthenticated, controller.getConsumables);
router.get('/logout', controller.getLogout);
router.get('/confirm/:id', controller.getConfirm);
router.get('/forgot/:id', controller.getForgot);
router.get('/about', controller.getAbout);

router.post('/register', controller.postRegister);
router.post('/forgot', controller.postForgot);
router.post('/', controller.postLogin)
router.post('/edit', checkNotAuthenticated, controller.postEdit);
router.post('/save', checkNotAuthenticated, controller.postSave);

module.exports = router;
