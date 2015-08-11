// Modulo de definicion de entorno.
var environment = function(){

    /* Configurar variables. */

    var port  = '3000';

    return {
        // Configuracion del servidor.
        name:'Quiz',
        subn:'Si lo sabes ¡Juega!',
        desc:'el juego de las preguntas',
        keyw:'Quiz, Juego, Pregunta, Respuesta',
        etag:false,
        xpby:false,
        path:'/var/www/serv/quiz',
        port:port,

        // Cadenas de Expresiones Regulares.
        filters:{
            string:'[a-zA-Z0-9.,;: ]'
        }
    };

};

module.exports = environment;