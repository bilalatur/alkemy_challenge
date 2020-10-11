var express = require('express');
var router = express.Router();
let indexController = require('../controllers/indexController');

/* Home Page */
router.get('/', indexController.home);

/* Delete*/
router.get('/delete/:id', indexController.deletePage);
router.post('/delete/:id', indexController.delete);

/* Edit */
router.get('/edit/:id', indexController.editPage);
router.post('/edit/:id', indexController.edit);



module.exports = router;
