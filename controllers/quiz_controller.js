var model = require('../models/models');
var env   = require('../environment')();

exports.load  = function(req,res,next,quizId){
	model.Quiz.findById(quizId)
		.then(function(quizes){
			if(quizes){
				req.quizes = quizes;
				next();
			} else {
				next(new Error('No existe el id '+quizId));
			}
		})
		.catch(function(error){ next(error); });
};

exports.index = function(req,res,next) {

	model.Quiz.all()
		.then(function(quizes){
			res.render('quizes/index',{
				layout:'layout',
				title:env.name,
				description:env.desc,
				quizes:quizes
			});	

		})
		.catch(function(error){ next(error); });

};

exports.find = function(req,res,next) {

	model.Quiz.all()
		.then(function(quizes){
			res.render('quizes/index',{
				layout:'layout',
				title:env.name,
				description:env.desc,
				quizes:quizes
			});	

		})
		.catch(function(error){ next(error); });

};

exports.question = function(req,res) {

	// Proceso.
	data = {
		layout:'layout',
		title:env.name,
		description:env.desc,
		id:req.quizes.id,
		pregunta:req.quizes.pregunta
	};

	// Salida.
	res.render('quizes/question',data);

};

exports.answer = function(req,res) {

	// Proceso.
	data = {
		layout:'layout',
		title:env.name,
		description:env.desc,
		id:req.quizes.id,
		resultado:''
	};

	if(req.query.respuesta===req.quizes.respuesta){
		data.resultado = 'Correcto';
	} else {
		data.resultado = 'Incorrecto';
	}

	// Salida.
	res.render('quizes/answer',data);

};