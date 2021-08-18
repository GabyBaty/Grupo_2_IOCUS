const express = require('express');
const router = express.Router();
const {index,about,contacto,search} = require('../controllers/mainController');

/* GET index page. */
router.get('/', index);
router.get('/about', about);
router.get('/contacto', contacto);
router.get('/search', search)
module.exports = router;
