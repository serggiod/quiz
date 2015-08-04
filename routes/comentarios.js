var express    = require('express');
var router     = express.Router();
var controller = require('../controllers/comentarios_controller');

// Rueams hacia el furmulario de comentarios.
router.get('/quizes/:quizId(\\d+)/comment',controller.commentGET);

// Ruteamos hasta la creación de un comentario.
router.post('/quizes/:quizId(\\d+)/comment',controller.commentPOST);

module.exports = router;