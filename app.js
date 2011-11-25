/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')

var app = module.exports = express.createServer();

var io = require('socket.io').listen(app);

// Configuration

app.configure(function(){
    app.set('views', __dirname + '/views');
    app.set('view engine', 'jade');
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(express.cookieParser());
    app.use(express.session({ secret: 'your secret here' }));
    app.use(express.compiler({ src: __dirname + '/public', enable: ['less'] }));
    app.use(app.router);
    app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
    app.use(express.errorHandler({ dumpExceptions: true, showStack: true })); 
});

app.configure('production', function(){
    app.use(express.errorHandler()); 
});

// Routes

app.get('/', routes.index);
app.get('/debug', routes.debug);

app.listen(3000);
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);

process.stdin.resume();
process.stdin.setEncoding('utf8');

io.sockets.on('connection', function(socket) {
    socket.emit('narrate', { message: 'Hello!' });
});

var face = io.of('/face').on('connection', function(socket) {
});

process.stdin.on('data', function (chunk) {
    //process.stdout.write('data: ' + chunk);
    try {
        var input = JSON.parse(chunk);
        if(input['mouth']) {
            face.emit('mouth', { mouth: input.mouth });
        }
    } catch (err) {
        console.log('error',err);
        io.sockets.emit('message', { message: chunk });
    }
});

