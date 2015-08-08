var controller = require('../controllers/preguntas_controller');
var express    = require('express');
var router     = express.Router();
var session    = require('../controllers/session_controller');

/* GET: Ir la lista de preguntas. */
router.get('/quizes',controller.index);

/* GET: Ir a la lsita de preguntas con una busqueda. */
router.get('/quizes/buscar/:string',controller.buscarGET);

// PARAMS: Cuando llegue quizId ejecutar load:
router.param('quizId',controller.load);

/* GET: Ir la página de una pregunta. */
router.get('/quizes/:quizId(\\d+)',controller.question);

/* GET: Ir la página de respuesta. */
router.get('/quizes/:quizId(\\d+)/answer',controller.answer);


/* GET: Ir la página de nueva pregunta (Formulario). */
router.get('/quizes/nuevo',session.loginRequired,controller.nuevoGET);

/* POST: Ir la página de nueva pregunta (Carga). */
router.post('/quizes/nuevo',session.loginRequired,controller.nuevoPOST);

/* GET: Ir a la página de editar pregunta (formulario). */
router.get('/quizes/:quizId(\\d+)/editar',session.loginRequired,controller.editarGET);

/* PUT: Ir a la página de editar pregunta (carga). */
router.put('/quizes/:quizId(\\d+)',session.loginRequired,controller.editarPUT);

/* DELETE: Ir a la página de eliminar pregunta (proceso). */
router.delete('/quizes/:quizId(\\d+)',session.loginRequired,controller.eliminarDELETE);


/* GET: Filtrar, ir a la página de filtrar preguntas (proceso). */
router.get('/quizes/tema/:tema',controller.filtrarGET);

// Exportar ruteador.
module.exports = router;
