const express = require('express');
const router = express.Router();
const {detail, cart, add, edit, filter, update} = require('../controllers/productsController');

/* GET products page. */
router.get('/detail/:id', detail);
router.get('/cart/:id', cart);
router.get('/add', add);

/* EDITAR UN PRODUCTO Y GUARDAR LOS CAMBIOS */
router.get('/edit/:id', edit);
router.put('/edit/:id', update)

router.get('/filter',filter);

module.exports = router;
