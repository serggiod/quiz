var model = require('../models/models');
var env   = require('../environment')();

exports.question = function(req,res,next) {

	model.Quiz.all()
		.then(function(quizes){
			res.render('quizes/question',{
				layout:'layout',
				title:env.name,
				description:env.desc,
				pregunta:quizes[0].pregunta
			});
		});
};

exports.answer = function(req,res,next) {
	// Proceso.
	var data = {
		title:env.name,
		description:env.desc,
		resultado:''
	};
	model.Quiz.all()
		.then(function(quizes){
			if(req.query.respuesta===quizes[0].respuesta){
				data.resultado = 'Correcto';
			} else {
				data.resultado = 'Incorrecto';
			}

			// Salida.
			res.render('quizes/answer',data);
		});
};