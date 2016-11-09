var express = require('express');
var mustache = require('mustache');
var fs = require('fs');

var server = express();

server.get('/logic.html', function(req, res) {
	fs.readFile('./logic.html', function(err, data) {
		res.writeHead(200, {
			'Content-Type': 'text/html'
		});

		res.write(mustache.render(data.toString(), {
			'stock': [
				{ 'name': Math.random().toString(36).substr(2), 'value': Math.random() * 1000.0, 'change': (Math.random() * 20.0) - 10.0, 'time': Math.round(Math.random() * 2000000000000), 'volume': Math.round(Math.random() * 1000000000000) },
				{ 'name': Math.random().toString(36).substr(2), 'value': Math.random() * 1000.0, 'change': (Math.random() * 20.0) - 10.0, 'time': Math.round(Math.random() * 2000000000000), 'volume': Math.round(Math.random() * 1000000000000) },
				{ 'name': Math.random().toString(36).substr(2), 'value': Math.random() * 1000.0, 'change': (Math.random() * 20.0) - 10.0, 'time': Math.round(Math.random() * 2000000000000), 'volume': Math.round(Math.random() * 1000000000000) }
			]
		}));

		res.end();
	});
});

server.listen(8080);

console.log('go ahead and open "http://localhost:8080/logic.html" in your browser');