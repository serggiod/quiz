var env   = require('../environment')();
var model = require('../models/models');

module.exports.commentGET = function(req,res){

	// Proceso.
	data = {
		layout:'layout',
		title:env.name,
		description:env.desc,

		session:req.session,
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

					session:req.session,
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

module.exports.load = function(req,res,next,commentId){
	model.Comment
		.find({
			where:{
				id:Number(commentId)
			}
		})
		.then(function(comment){
			if(comment){
				req.comment = comment;
				next();
			} else {
				next(next(new Error('No existe el comentario commentId='+commentId)));
			}
			
		})
		.catch(function(error){
			next(error);
		});
};

module.exports.commentPUBLISH = function(req,res,next){
	req.comment.publicado=true;
	req.comment
		.save({fields:['publicado']})
		.then(function(){
			res.redirect('/quizes/'+req.params.quizId);
		})
		.catch(function(error){
			next(error);
		});
};