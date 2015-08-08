var express    = require('express');
var router     = express.Router();
var controller = require('../controllers/comentarios_controller');
var session    = require('../controllers/session_controller');

// 
router.param('commentId',controller.load);

// Rueams hacia el furmulario de comentarios.
router.get('/quizes/:quizId(\\d+)/comment',controller.commentGET);

// Ruteamos hasta la creación de un comentario.
router.post('/quizes/:quizId(\\d+)/comment',controller.commentPOST);

// 
router.get('/quizes/:quizId(\\d+)/comment/:commentId(\\d+)/publish',session.loginRequired,controller.commentPUBLISH);

module.exports = router;