var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var signupRouter = require('./routes/signup');
var dashboard = require('./routes/dashboard');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

//ruta de jquery
app.use(express.static(path.join(__dirname, '/node_modules/jquery/dist')));

//ruta de font awesome
app.use(express.static(path.join(__dirname, '/node_modules/font-awesome')));

//ruta de bootstrap
app.use(express.static(path.join(__dirname, '/node_modules/bootstrap/dist')));

//ruta de async
app.use(express.static(path.join(__dirname, '/node_modules/async/dist')));

//ruta de sweet alert 2
app.use(express.static(path.join(__dirname, '/node_modules/sweetalert2/dist')));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/signup', signupRouter);
app.use('/dashboard', dashboard);

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

module.exports = app;
