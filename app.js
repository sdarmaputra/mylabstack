var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var hbs = require('hbs');
var config = require('./configs/config');

var app = express();

//define modules
var lab = require('./'+config.app_modules_dirname+'/lab/controllers/labController');
var category = require('./'+config.app_modules_dirname+'/category/controllers/categoryController');
var computer = require('./'+config.app_modules_dirname+'/computer/controllers/computerController');
var home = require('./'+config.app_modules_dirname+'/home/controllers/homeController');
var service = require('./'+config.app_modules_dirname+'/service/controllers/serviceController');
var ipRange = require('./'+config.app_modules_dirname+'/ipRange/controllers/ipRangeController');
var user = require('./'+config.app_modules_dirname+'/user/controllers/userController');

// view engine setup
app.set('views', path.join(__dirname, config.app_modules_dirname));
app.set('view engine', 'hbs');
hbs.registerPartials(path.join(__dirname, config.base_partial_views_dirname));
app.engine('hbs', hbs.__express);

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//define routes
app.use('/user', user);
app.use('/ipRange', ipRange);
app.use('/service', service);
app.use('/lab', lab);
app.use('/category', category);
app.use('/computer', computer);
app.use('/', home);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render(config.base_views_dirname+'/error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render(config.base_views_dirname+'/error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
