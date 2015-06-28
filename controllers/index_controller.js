var env = require('../environment')();

exports.index = function(req,res,next) {
	res.render('index',{
		title:env.name,
		description:env.desc
	});
};