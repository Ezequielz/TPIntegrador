const express = require('express');
const router = express.Router();

const sucursalesController = require('../controllers/sucursalesController')

router.get('/',sucursalesController.todasLasSucursales);
router.get("/:id",sucursalesController.detalle)


module.exports = router;