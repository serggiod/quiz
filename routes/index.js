var express          = require('express');
var router           = express.Router();
var index_controller = require('../controllers/index_controller');
var quiz_controller  = require('../controllers/quiz_controller');

/* GET: Ir a la página de inicio. */
router.get('/',index_controller.index);

/* GET: Ir la lista de preguntas. */
router.get('/quizes',quiz_controller.index);

/* POST: Ir a la lsita de preguntas con una busqueda. */
router.post('/quizes',quiz_controller.search);


// PARAMS: Cuando llegue quizId ejecutar load:
router.param('quizId',quiz_controller.load);

/* GET: Ir la página de una pregunta. */
router.get('/quizes/:quizId(\\d+)',quiz_controller.question);

/* GET: Ir la página de respuesta. */
router.get('/quizes/:quizId(\\d+)/answer',quiz_controller.answer);


/* GET: Ir la página de nueva pregunta (Formulario). */
router.get('/quizes/nuevo',quiz_controller.nuevoGET);

/* POST: Ir la página de nueva pregunta (Carga). */
router.post('/quizes/nuevo',quiz_controller.nuevoPOST);


/* GET: Ir a la página de editar pregunta (formulario). */
router.get('/quizes/:quizId(\\d+)/editar',quiz_controller.editarGET);

/* PUT: Ir a la página de editar pregunta (carga). */
router.put('/quizes/:quizId(\\d+)',quiz_controller.editarPUT);


/* DELETE: Ir a la página de eliminar pregunta (proceso). */
router.delete('/quizes/:quizId(\\d+)',quiz_controller.eliminarDELETE);


/* GET: Ir la página de créditos. */
router.get('/author',index_controller.author);


module.exports = router;
