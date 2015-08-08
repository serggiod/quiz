var env   = require('../environment')();
var model = require('../models/models');
var userController = require('./user_controller');

module.exports.loginGET = function(req,res,next){
	var errors = req.session.errors || {};
	req.session.errors = {};

	data = {
		layout:'layout',
		title:env.name,
		description:env.desc,
		session:req.session,
		errors:errors
	};

	res.render('session/login',data);
};

module.exports.loginPOST = function(req,res,next){

	login = req.body.login;
	password = req.body.password;

	userController.autenticar(login,password,function(error,user){

		if(error){
			req.session.errors = [{'message':'Se ha producido un error '+error}];
			res.redirect('/login');
			return;
		}

		req.session.user = {id:user.id,username:user.username};
		res.redirect('/quizes');			

	});

};

module.exports.logoutGET = function(req,res,next){
	delete req.session.user;
	console.log(req.session.user);
	res.redirect('/login');
};

module.exports.loginRequired = function(req,res,next){
	if(req.session.user){
		next();
	} else {
		res.redirect('/login');
	}
};