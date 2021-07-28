const express = require('express');
const router = express.Router();
const {index,about,contacto} = require('../controllers/indexController');

/* GET index page. */
router.get('/', index);
router.get('/about', about);
router.get('/contacto', contacto);
module.exports = router;
