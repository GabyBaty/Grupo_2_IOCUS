const express = require('express');
const router = express.Router();
const {detail, cart, add, edit, filter} = require('../controllers/productsController');

/* GET products page. */
router.get('/detail', detail);
router.get('/cart', cart);
router.get('/add', add);
router.get('/edit', edit);
router.get('/filter',filter);

module.exports = router;
