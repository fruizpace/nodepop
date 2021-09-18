var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const utils = require('./lib/utils'); // funciones auxiliares que he creado

var indexRouter = require('./routes/index.js');
var apiRouter = require('./routes/api/anuncios.js');
var tagRouter = require('./routes/api/tag.js');

var app = express();

// Conectamos a la base de datos con Mongoose:
require('./lib/connectMongoose'); // La conexión está en connectMongoose.js


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html'); // cambiamos de ejs a html
app.engine('html', require('ejs').__express) // añadimos esta linea para que sepa como leer html

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


// Rutas
app.use('/', indexRouter); // a la página principal que muestra anuncios
app.use('/api/anuncios', apiRouter); // a la API de anuncions (donde también se usarán los filtros)
app.use('/api/tag', tagRouter); // a la lista de tag (mustra lista estática de tags)


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  res.status(err.status || 500); // lo ponemos aquí porque así el status será 404 si escriben mal la ruta

  if (utils.isAPIrequest(req)) { // si ponen mal la ruta después del API...
    return res.json({ error: err.message }); // importante poner RETURN! para que esta sea la respuesta y no se ejecute las siguientes líneas
  }

  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.render('error');
});

module.exports = app;