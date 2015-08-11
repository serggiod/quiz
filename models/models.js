var path = require('path');

// Cargar modelo ORM.
var Sequelize = require('sequelize');

// Matchear la url de la DB.
//process.env.DATABASE_URL='sqlite://:@:/';
//process.env.DATABASE_STORAGE='quiz.sqlite';

var url = process.env.DATABASE_URL.match(/(.*)\:\/\/(.*?)\:(.*)@(.*)\:(.*)\/(.*)/);
var dbname = (url[6] || null);
var dbuser = (url[2] || null);
var dbpswd = (url[3] || null);
var dbprot = (url[1] || null);
var dbdial = (url[1] || null);
var dbport = (url[5] || null);
var dbhost = (url[4] || null);
var dbstor = process.env.DATABASE_STORAGE;

// Usar una DB.
var sequelize = new Sequelize(dbname,dbuser,dbpswd,{
	protocol  :dbprot,
	host      :dbhost,
	port      :dbport,
	dialect   :dbdial,
	storage   :dbstor,
	omitNull  :true
});

// Importar la definición de la tabla quiz.
var Quiz    = sequelize.import(path.join(__dirname,'quiz'));
var Comment = sequelize.import(path.join(__dirname,'comment'));

// Establecer relaciones.

Comment.belongsTo(Quiz);
Quiz.hasMany(Comment, {
'constraints': true,
'onUpdate': 'cascade',
'onDelete': 'cascade',
'hooks': true
});

// Exportar la definición.
exports.Quiz    = Quiz;
exports.Comment = Comment;



// sequelize.sync() crea y sincroniza la tabla quiz;
sequelize.sync()
	.then(function(){
		Quiz
			.count()
			.then(function(count){
				if(count===0){
					Quiz
						.create({
							tema:'Paises',
							pregunta:'¿Cual es la capital de Italia?',
							respuesta:'Roma'
						})
						.then(function(){
							console.log('Tabla Quizzes creada.');
						});
				}
			});
		Comment
			.count()
			.then(function(count){
				if(count===0){
					Comment
						.create({
							texto:'comentario'
						})
						.then(function(){
							console.log('Tabla Comments creada.');
						});
				}
			});
	});