var env = require('../environment')();

exports.question = function(req,res,next) {
	res.render('quizes/question',{
		layout:'layout',
		title:env.name,
		description:'El juego de las preguntas.',
		pregunta:'¿Cuál es la capital de Italia?'
	});
};

exports.answer = function(req,res,next) {
	// Proceso.
	var data = {
		title:env.name,
		description:'El juego de las preguntas.',
		resultado:''
	};

	if(req.query.respuesta==='Roma'){
		data.resultado = 'Correcto';
	} else {
		data.resultado = 'Incorrecto';
	}

	// Salida.
	res.render('quizes/answer',data);
};