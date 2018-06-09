var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cantidad = require('./cantidadSchema').Cantidad;

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

//Initialize bd
cantidad.find().then((result) => {
  if(!result[0]){
      c = new cantidad();
      c.cantidad = 1;
      c.fecha = Date.now();
      c.save();
  }
});


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.set('port', (process.env.PORT || 8080))

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
/*app.listen(8080, function () {
    console.log('Escuchando en el puerto 8080');
});*/
app.listen(app.get('port'));
module.exports = app;
