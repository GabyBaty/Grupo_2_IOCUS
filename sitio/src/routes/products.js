const express = require('express');
const router = express.Router();
const {detail, cart, editor} = require('../controllers/productsController');

/* GET products page. */
router.get('/detail', detail);
router.get('/cart', cart);
router.get('/editor', editor);

module.exports = router;
