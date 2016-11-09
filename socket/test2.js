

var express = require('express');
var socket = require('socket.io');
var server = express();

server.use('/', express.static(__dirname + '/'));
var io = socket(server.listen(8080));

io.on('connection', function(socket) {
    io.emit('message', {
        'name': 'server',
        'message': 'user connected'

    });

    socket.on('message', function(data) {
        socket.emit('message', {
            'name': jQuery('#name').val(),
            'message': jQuery('#message').val()
        });

})
    socket.on('disconnect', function() {
        io.emit('message', {
            'name': 'server',
            'message': 'user disconnected'
        });
    });
});