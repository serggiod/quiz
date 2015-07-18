var express          = require('express');
var router           = express.Router();
var index_controller = require('../controllers/index_controller');
var quiz_controller  = require('../controllers/quiz_controller');

/* GET: Ir a la página de inicio. */
router.get('/',index_controller.index);

/* GET: Ir la lista de preguntas. */
router.get('/quizes',quiz_controller.index);

/* POST: Ir la lista de preguntas a partir de na busqueda. */
router.post('/quizes',quiz_controller.find);


// PARAMS: Cuando llegue quizId ejecutar load:
router.param('quizId',quiz_controller.load);

/* GET: Ir la página de una pregunta. */
router.get('/quizes/:quizId(\\d+)',quiz_controller.question);

/* GET: Ir la página de respuesta. */
router.get('/quizes/:quizId(\\d+)/answer',quiz_controller.answer);

/* GET: Ir la página de créditos. */
router.get('/author',index_controller.author);


module.exports = router;
