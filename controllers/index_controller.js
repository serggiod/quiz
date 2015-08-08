var env = require('../environment')();

exports.index = function(req,res,next) {
	// Datos.
	data = {
		layout:'layout',
		title:env.name,
		description:env.desc,
		session:req.session,
		errors:[]
	};
	// Salida.
	res.render('index',data);
};

exports.author = function(req,res,next) {
	// Datos.
	data = {
		layout:'layout',
		title:env.name,
		description:env.desc,
		session:req.session,
		errors:[]
	};
	// Salida.
	res.render('author',data);
};