var express = require('express');
var router = express.Router();
let formController = require('../controllers/formController');

/* Form */
router.get('/', formController.form);

/* Add operation*/
router.post('/', formController.addOp);

module.exports = router;
