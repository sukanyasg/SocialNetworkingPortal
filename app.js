var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var database = require('./database');
var index = require('./routes/index');
var blog = require('./routes/blog');
var a = 'k';
var app = express();


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', index);
app.use('/blog', blog);

var io = require('socket.io').listen(7080);

/// catch 404 and forwarding to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
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
    res.render('error', {
        message: err.message,
        error: {}
    });
});


var connections = []; 
io.sockets.on('connection', function (socket) {
   connections.push(socket);
   socket.on('save', function (data) {

    database.blogEntries.insert(data, function(datum) {
       
       for (var i = 0; i < connections.length; i++)
        {
            connections[i].emit('msg' , {title: data.title, timestamp: data.timestamp} );    
        }   
        
    });
    socket.emit('msg',data)
    
  });

});
module.exports = app;
