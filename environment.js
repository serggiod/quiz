// Modulo de definicion de entorno.
var environment = function(){

    /* Configurar variables. */

    var host  = 'localhost';
    var port  = '8000';
    var prot  = 'http';

    return {
        // Configuracion del servidor.
        name:'Quiz - Preguntas',
        subn:'Si lo sabes ¡Juega!',
        desc:'Portal de preguntas y respuestas.',
        keyw:'Quiz, Juego, Pregunta, Respuesta',
        env :'production',
        etag:false,
        xpby:false,
        path:'/var/www/serv/quiz',
        host:host,
        port:port,
        prot:prot,
        url:prot+'://'+host+':'+port,
        postgre:{
            user:'sdominguez',
            pass:'password',
            host:'localhost',
            name:'basededatos'            
        },

        // Cadenas de Expresiones Regulares.
        filters:{
            string:'[a-zA-Z0-9.,;: ]'
        }
    };

};

module.exports = environment;