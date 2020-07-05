const express = require('express');
const router = express.Router();

const autosController = require('../controllers/autosController')

router.get('/',autosController.index);
router.get('/:marca',autosController.autoMarca);
router.get('/:marca/:dato?/:dato2?',autosController.dato);







module.exports = router;