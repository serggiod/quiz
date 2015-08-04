var env   = require('../environment')();
var model = require('../models/models');

module.exports.commentGET = function(req,res){
	console.log('Yo');
	// Proceso.
	data = {
		layout:'layout',
		title:env.name,
		description:env.desc,

		quizId:req.params.quizId,
		errors:[]
	};

	// Salida.
	res.render('comments/nuevo',data);
};

module.exports.commentPOST = function(req,res){
	var comment = model.Comment.build({
		texto:req.body.comment.texto,
		QuizId:req.params.quizId
	});

	comment
		.validate()
		.then(function(err){
			if(err){

				// Proceso.
				data = {
					layout:'layout',
					title:env.name,
					description:env.desc,
					search:req.params.string,

					quizId:req.params.quizId,
					errors:[]
				};

				// Salida.
				res.render('coments/nuevo',data);
			} else {
				comment
					.save()
					.then(function(){
						res.redirect('/quizes/'+req.params.quizId);
					});
			}
		})
		.catch(function(err){
			next(err);
		});
};