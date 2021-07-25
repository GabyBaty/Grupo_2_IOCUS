const express = require('express');
const router = express.Router();
const {detail, cart, editor, filter} = require('../controllers/productsController');

/* GET products page. */
router.get('/detail', detail);
router.get('/cart', cart);
router.get('/editor', editor);
router.get('/filter',filter);

module.exports = router;
