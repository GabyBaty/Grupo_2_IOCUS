const express = require('express');
const router = express.Router();
const {detail, cart, add, edit, filter} = require('../controllers/productsController');

/* GET products page. */
router.get('/detail/:id', detail);
router.get('/cart/:id', cart);
router.get('/add', add);
router.get('/edit', edit);
router.get('/filter',filter);

module.exports = router;
