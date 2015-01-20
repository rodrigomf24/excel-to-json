
/*
 * @author: Rodrigo Morales
 * @project: virtuemart
 * @year: 2014
 * @version: 0.1
 */

var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var methodOverride  = require('method-override');
var debug = require('debug')('virtuemart');
var session = require('express-session');
var busboy = require('connect-busboy');


var routes = require('./routes/index');
var xlsParser = require('./routes/uploader');
var results  = require('./routes/results');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
//app.set('view engine', 'jade');
app.engine('.html', require('ejs').__express);
app.set('view engine', 'html');

app.use(busboy()); 
app.use(favicon());
app.use(logger('dev'));  //log every request to the console
app.use(bodyParser.json());  //pull information from html in POST
app.use(bodyParser.urlencoded({  extended: true  }));
app.use(bodyParser());          //pull information from html in POST
app.use(session({ resave: true,
                  saveUninitialized: true,
                  secret: 'uwotm8' }));
app.use(cookieParser());
app.use(methodOverride());      //simulate DELETE and PUT
app.use(express.static(path.join(__dirname, 'public'))); // Set the static files location /public/img will be /img for users
app.set('port', process.env.PORT || 8080);

app.use('/', routes);
app.use('/uploader', xlsParser);
app.use('/results', results);

/// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    debug(err);
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        debug(err);
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    debug(err);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


//module.exports = app;

app.listen(app.get('port'), function() {
    debug('Express server listening on port 8080');
});

