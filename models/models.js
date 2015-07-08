var path = require('path');

// Cargar modelo ORM.
var Sequelize = require('sequelize');

// Usar DB SQLite.
var sequelize = new Sequelize(null,null,null,{
	dialect:'sqlite',
	storage:'quiz.sqlite'
});

// Importar la definición de la tabla quiz.
var Quiz = sequelize.import(path.join(__dirname,'quiz'));

// Exportar la definición.
exports.Quiz = Quiz;

// sequelize.sync() crea y sincroniza la tabla quiz;
sequelize.sync().then(function(){
	Quiz.count().then(function(count){
		if(count===0){
			Quiz
				.create({
					pregunta:'¿Cual es la capital de Italia?',
					respuesta:'Roma'
				})
				.then(function(){
					console.log('Base de datos inicializada.');
				});
		}
	});
});