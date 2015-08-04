var controller = require('../controllers/index_controller');
var express    = require('express');
var router     = express.Router();

/* GET: Ir a la página de inicio. */
router.get('/',controller.index);

/* GET: Ir la página de créditos. */
router.get('/author',controller.author);

// Exportar ruteador.
module.exports = router;