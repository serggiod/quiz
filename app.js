var express        = require('express');
var path           = require('path');
var favicon        = require('serve-favicon');
var logger         = require('morgan');
var cookieParser   = require('cookie-parser');
var bodyParser     = require('body-parser');
var partials       = require('express-partials');
var methodOverride = require('method-override');

// Requerir a los ruteadores.
var index       = require('./routes/index');
var preguntas   = require('./routes/preguntas');
var comentarios = require('./routes/comentarios');

// Instanciar aplicación express.
var app   = express();

// Configurar aplicación.
app.set('x-power-by',false);

// Motor de renderizado.
app.set('views',path.join(__dirname, 'views'));
app.set('view engine','ejs');

// Cargar middlewares.
app.use(partials());
app.use(favicon(__dirname+'/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(cookieParser());
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));

// Cargar ruteadores.
app.use('/',index);
app.use('/',preguntas);
app.use('/',comentarios);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err,
      errors:[]
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {},
    errors:[]
  });
});


module.exports = app;
