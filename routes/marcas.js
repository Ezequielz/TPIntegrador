const express = require('express');
const router = express.Router();

const marcasController = require('../controllers/marcasController')

router.get('/',marcasController.marcas);
router.get('/:id',marcasController.detalle);

module.exports = router;