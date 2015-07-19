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
		.catch(function(){
			res.redirect('/');
		});

};

exports.search = function(req,res,next) {

	var string = ('%'+req.body.search+'%').replace(/\ /g,'%');

	model.Quiz.findAll({
			where:{pregunta:{$like:string}},
			order:[['pregunta','ASC']]
		})
		.then(function(quizes){

			// Proceso.
			data = {
				layout:'layout',
				title:env.name,
				description:env.desc,
				search:req.body.search,
				quizes:{}
			};

			if(quizes) data.quizes=quizes;

			// Salida.
			res.render('quizes/search',data);

		})
		.catch(function(){
			res.redirect('/quizes');
		});

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

exports.nuevoGET = function(req,res) {

	// Proceso.
	quizes = model.Quiz.build({
		pregunta:'Nueva pregunta...',
		respuesta:'Nueva respuesta...'
	});

	data = {
		layout:'layout',
		title:env.name,
		description:env.desc,
		quizes:quizes
	};

	// Salida.
	res.render('quizes/nuevo',data);

};

exports.nuevoPOST = function(req,res) {

	// Proceso.
	var quiz = model.Quiz;
	quiz.create(req.body.quizes)
	.then(function(){
		console.log(1);
		res.redirect('/quizes');	
	});

};