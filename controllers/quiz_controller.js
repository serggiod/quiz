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

	model.Quiz.findAll({
			attributes:['tema'],
			group:['tema'],
			order:[['tema']]
		})
		.then(function(temas){

			var Temas = [];
			for(i in temas){
				Temas[i] = temas[i].tema; 
			}

			model.Quiz.all()
				.then(function(quizes){
					res.render('quizes/index',{
						layout:'layout',
						title:env.name,
						description:env.desc,
						quizes:quizes,
						errors:[],
						temas:Temas,
					});	

				})
				.catch(function(){
					res.redirect('/');
				});

		})
		.catch(function(){
			res.redirect('/');
		});

};

exports.buscarGET = function(req,res,next) {

	model.Quiz.findAll({
			attributes:['tema'],
			group:['tema'],
			order:[['tema']]
		})
		.then(function(temas){

			var Temas = [];
			for(i in temas){
				Temas[i] = temas[i].tema; 
			}

			var string = ('%'+req.params.string+'%').replace(/\ /g,'%');

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
						search:req.params.string,
						quizes:{},
						errors:[],
						temas:Temas
					};

					if(quizes) data.quizes=quizes;

					// Salida.
					res.render('quizes/search',data);

				})
				.catch(function(){
					res.redirect('/quizes');
				});

		})
		.catch(function(){
			res.redirect('/');
		});

};

exports.question = function(req,res) {

	// Proceso.
	data = {
		layout:'layout',
		title:env.name,
		description:env.desc,
		id:req.quizes.id,
		pregunta:req.quizes.pregunta,
		errors:[]
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
		resultado:'',
		errors:[]
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

	model.Quiz.findAll({
			attributes:['tema'],
			group:['tema'],
			order:[['tema']]
		})
		.then(function(temas){

			// Proceso.

			var Temas = [];
			for(i in temas){
				Temas[i] = temas[i].tema; 
			}

			quizes = model.Quiz.build({
				pregunta:'Nueva pregunta...',
				respuesta:'Nueva respuesta...'
			});

			data = {
				layout:'layout',
				title:env.name,
				description:env.desc,
				quizes:quizes,
				errors:[],
				temas:Temas
			};

			// Salida.
			res.render('quizes/nuevo',data);

		})
		.catch(function(){
			res.redirect('/');
		});

};

exports.nuevoPOST = function(req,res) {

	model.Quiz.findAll({
			attributes:['tema'],
			group:['tema'],
			order:[['tema']]
		})
		.then(function(temas){

			// Proceso.

			var Temas = [];
			for(i in temas){
				Temas[i] = temas[i].tema; 
			}

			// Proceso.
			var quiz = model.Quiz.build(req.body.quizes);

			quiz
				.validate()
				.then(function(err){
					if(err){

						data = {
							layout:'layout',
							title:env.name,
							description:env.desc,
							quizes:quiz,
							errors:err.errors,
							temas:Temas
						};

						// Salida.
						res.render('quizes/nuevo',data);

					} else {
						
						quiz
							.save({fields:['tema','pregunta','respuesta']})
							.then(function(){
								res.redirect('/quizes');		
							});
						
					}
				});
		})
		.catch(function(){
			res.redirect('/');
		});
};

exports.editarGET = function(req,res){

	model.Quiz.findAll({
			attributes:['tema'],
			group:['tema'],
			order:[['tema']]
		})
		.then(function(temas){

			// Proceso.

			var Temas = [];
			for(i in temas){
				Temas[i] = temas[i].tema; 
			}
			
			quizes = req.quizes;

			data = {
				layout:'layout',
				title:env.name,
				description:env.desc,
				quizes:quizes,
				errors:[],
				temas:Temas
			};

			// Salida.
			res.render('quizes/editar',data);

		})
		.catch(function(){
			res.redirect('/');
		});
};

exports.editarPUT = function(req,res){

	model.Quiz.findAll({
			attributes:['tema'],
			group:['tema'],
			order:[['tema']]
		})
		.then(function(temas){

			// Proceso.

			var Temas = [];
			for(i in temas){
				Temas[i] = temas[i].tema; 
			}
			// Proceso.
			req.quizes.tema = req.body.quizes.tema;
			req.quizes.pregunta = req.body.quizes.pregunta;
			req.quizes.respuesta = req.body.quizes.respuesta;

			req.quizes
				.validate()
				.then(function(err){
					if(err){

						data = {
							layout:'layout',
							title:env.name,
							description:env.desc,
							quizes:req.quizes,
							errors:err.errors,
							temas:Temas
						};

						// Salida.
						res.render('quizes/editar',data);

					} else {
						
						req.quizes
							.save({fields:['tema','pregunta','respuesta']})
							.then(function(){
								res.redirect('/quizes');		
							});
						
					}
				});

		})
		.catch(function(){
			res.redirect('/');
		});
};

exports.eliminarDELETE = function(req,res,next){

		req.quizes.destroy()
			.then(function(){

				res.redirect('/quizes');

			})
			.catch(function(err){
			
				next(err);
			
			});

};

exports.filtrarGET = function(req,res,next){

	var tema = req.params.tema;

	if(tema!='todos'){
		model.Quiz.findAll({
				attributes:['tema'],
				group:['tema'],
				order:[['tema']]
			})
			.then(function(temas){

				var Temas = [];
				for(i in temas){
					temas[i].tema[0].toUpperCase();
					Temas[i] = temas[i].tema; 
				}

					model.Quiz.findAll({
						where:{tema:{$like:tema}},
						order:[['pregunta','ASC']]
					})
					.then(function(quizes){

						// Proceso.
						data = {
							layout:'layout',
							title:env.name,
							description:env.desc,
							search:req.body.search,
							quizes:{},
							errors:[],
							tema:tema,
							temas:Temas
						};

						if(quizes) data.quizes=quizes;

						// Salida.
						res.render('quizes/tema',data);

					})
					.catch(function(){
						res.redirect('/quizes');
					});

			})
			.catch(function(){
				res.redirect('/');
			});
	} else {
		res.redirect('/quizes');
	}

};