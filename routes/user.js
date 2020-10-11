var express = require('express');
var router = express.Router();
let userController = require('../controllers/userController');

/* Register */
router.get('/register', userController.register)
router.post('/register', userController.postRegister)

/* Login*/
router.get('/login', userController.login)
router.post('/login', userController.postLogin)

/* Logout*/
router.get('/logout', userController.logout)


module.exports = router;