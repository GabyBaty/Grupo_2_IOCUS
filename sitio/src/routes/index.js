const express = require('express');
const router = express.Router();
const {index, about} = require('../controllers/indexController');

/* GET index page. */
router.get('/', index);
router.get('/about', about);
module.exports = router;
