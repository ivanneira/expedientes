var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

//modelos de base de datos
var models = require('./models')

//ruta para pruebas
var test = require('./routes/test');

var indexRouter = require('./routes/index');
var signupRouter = require('./routes/signup');
var dashboard = require('./routes/dashboard');
var logout = require('./routes/logout');
var data = require('./routes/data');

var app = express();

var session = require('express-session')

//cookies de sesión
app.use(session({
  secret: 'jsm',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false, maxAge: null }
}))

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

//ruta de datatables.net 
app.use(express.static(path.join(__dirname, '/node_modules/datatables.net/')));

//ruta de datatables.net - responsive - bs4
app.use(express.static(path.join(__dirname, '/node_modules/datatables.net-bs4/')));

//ruta de datatables.net - responsive
app.use(express.static(path.join(__dirname, '/node_modules/datatables.net-responsive/')));

//ruta de datatables.net - responsive - bs4
app.use(express.static(path.join(__dirname, '/node_modules/datatables.net-responsive-bs4/')));

//ruta de datatables selection
app.use(express.static(path.join(__dirname, '/node_modules/datatables.net-select/')));


//ruta de datatables selection dt
app.use(express.static(path.join(__dirname, '/node_modules/datatables.net-select-dt/')));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/test', test);

app.use('/', indexRouter);
app.use('/signup', signupRouter);
app.use('/dashboard', dashboard);
app.use('/logout', logout);
app.use('/data', data);

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
