var express    = require('express');
var router     = express.Router();
var controller = require('../controllers/session_controller');

// Rutea hacia el furmulario de login.
router.get('/login',controller.loginGET);

// Rutea datos hacia login.
router.post('/login',controller.loginPOST);

// Ruteamos hasta la logout.
router.get('/logout',controller.logoutGET);

module.exports = router;