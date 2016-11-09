'use strict';

var express = require('express'); // do not change this line
var socket = require('socket.io'); // do not change this line
var assert = require('assert'); // do not change this line

var server = express();

server.use('/', express.static(__dirname + '/'));

var io = socket(server.listen(process.env.PORT || 8080)); // do not change this line

var objectClients = {};

io.on('connection', function(socketHandle) {

	socketHandle.id = Math.random().toString(36).substr(2, 8);
	socketHandle.emit('hello',{
		'id': socketHandle.id,
	});

	objectClients[socketHandle.id] =
		{
			'id': socketHandle.id,
			'socket' : socketHandle
		}


	console.log(objectClients);

	//var x = $.makeArray(objectClients);

	//var arr = Object.keys(objectClients).map(function (key) {return objectClients[key]});

	var arr =[];
	for( var i in objectClients ) {
		if (objectClients.hasOwnProperty(i)){
			arr.push(objectClients[i].id);
		}
	}

	io.emit('clients', {
		'array': arr,
	});
	io.emit('message',{
	    'from': 'server',
        'to': 'everyone',
        'message': socketHandle.id + ' connected'
	});

	console.log('client with id ' + socketHandle.id + ' connected');

	// assign a random id to the socket and store the socketHandle in the objectClients variable - example: '9T1P4pUQ'
	// send the new client the 'hello' event, containing the assigned id - example: { 'id':'9T1P4pUQ' }
	// send everyone the 'clients' event, contianing an array of the connected clients - example: { 'array':['GxwYr9Uz','9T1P4pUQ'] }
	// send everyone the 'message' event, containing a message that a new client connected - example: { 'from':'server', 'to':'everyone', 'message':'9T1P4pUQ connected' }

	socketHandle.on('message', function(objectData) {
		console.log('*******');
		console.log(objectData);

		if(objectData.to === "everyone") {
			io.sockets.emit('message', {
				'from': socketHandle.id,
				'to': objectData.to,
				'message': objectData.message
			});
			console.log('to everyone *****');
			}
		else{

			objectClients[objectData['to']].socket.emit('message', {
				'from': socketHandle.id,
				'to': objectData['to'],
				'message': objectData.message
			});
			socketHandle.emit('message', {
				'from': socketHandle.id,
				'to': objectData['to'],
				'message': objectData.message
			});
			/*
			io.sockets.sockets[objectData.to].emit("message", { from: socketHandle.id, to: objectData.to,
				message: objectData.message });
			socketHandle.emit("message", { from: socketHandle.id, to: objectData.to, message: 'private message' });
*/

		/*
			objectClients[objectData.to].emit('message', {
				'from': socketHandle.id,
				'to': objectData.to,
				'message': objectData.message
			});

			console.log('private text***');
*/
			/*
			objectClients[objectData.to].emit('message', {
				'from': socketHandle.id,
				'to': objectData.to,
				'message': objectData.message
			});
			objectClients[objectData.from].emit('message', {
				'from': socketHandle.id,
				'to': objectData.to,
				'message': objectData.message
			});
		*/
			/*
			io.sockets.sockets(objectData.from).emit('message', {
				'from': socketHandle.id,
				'to': objectData.to,
				'message': objectData.message
			});
*/
		}

		// if the message should be recevied by everyone, broadcast it accordingly
		// if the message has a single target, send it to this target as well as to the origin
	});

	socketHandle.on('disconnect', function() {
		delete objectClients[socketHandle.id];
		var arr =[];
		for( var i in objectClients ) {
			if (objectClients.hasOwnProperty(i)){
				arr.push(objectClients[i].id);
			}
		}

		io.emit('clients', {
			'array': arr,
		});
		io.emit('message',{
			'from': 'server',
			'to': 'everyone',
			'message': socketHandle.id + ' disconnected'
		});
		// remove the disconnected client from the objectClients variable
		// send everyone the 'clients' event, contianing an array of the connected clients - example: { 'array':['GxwYr9Uz'] }
		// send everyone the 'message' event, containing a message that an existing client disconnected - example: { 'from':'server', 'to':'everyone', 'message':'9T1P4pUQ disconnected' }
	});
});

console.log('go ahead and open "http://localhost:8080/chat.html" in your browser');









