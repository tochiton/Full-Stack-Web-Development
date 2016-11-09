'use strict';

var express = require('express'); // do not change this line
var parser = require('body-parser'); // do not change this line

// create an express server just like in the first exercise
// as shown in the examples, you are asked to respond to various requests in different ways
// you will need to use the body parser to retrieve the post data

// examples which serve as a specification for the required features, note that they have an order:
//   http://localhost:8080/form should return the form as shown below
//   http://localhost:8080/new should retrieve the post data, save the name / message and return 'thank you for your message' in plain text
//   http://localhost:8080/list should return the stored messages 'name: message' in plain text
//   http://localhost:8080/form should return the form as shown below
//   http://localhost:8080/new should retrieve the post data, save the name / message and return 'thank you for your message' in plain text
//   http://localhost:8080/list should return the stored messages 'name: message\nanother name: another message' in plain text
//   [the server restarts and looses all messages]
//   http://localhost:8080/list should return '' in plain text

var server = express();
//server.use(parser());
var username = [];
var message = [];

var usermessage ='';

server.use(parser.urlencoded({
	extended: true
}));
server.use(parser.json());

server.get('/form', function (req, res) {
	res.status(200);
	res.set({
	'Content-Type': 'text/html'
});

	res.write('<!DOCTYPE html>');
	res.write('<html>');
	res.write('<body>');
		res.write('<form action="/new" method="post">');
			res.write('<input type="text" name="name">');
			res.write('<input type="text" name="message">');
			res.write('<input type="submit" value="submit">');
		res.write('</form>');
	res.write('</body>');
	res.write('</html>');

	res.end();
});

server.post('/new', function (req, res) {
	res.status(200);
	res.set({
		'Content-Type': 'text/plain'
	});

		//username.push(req.body.name);
		//message.push(req.body.message);

	var text = req.body.name+': '+ req.body.message;

	if(usermessage ===''){
		usermessage = text;
	}
	else{
		usermessage +='\n' + text;
	}

	res.write('thank you for your message' );

//	var temp = req.body;

//	console.log(username+ ' ' + message);
//	console.log(temp);


	res.end();
});

server.get('/list', function (req, res) {
	res.status(200);
	res.set({
		'Content-Type': 'text/plain'
	});
	res.write(usermessage);
/*
	if(username.name === ''){
		res.write('');
	}
	else if(username.name && username.length < 1)
	{
		res.write(username[0] + ': ' + message[0]);
	}
	else if(username.length > 0){
	for(var i = 0; i < username.length; i++){
		if(i = username.length) {
			res.write(username[i] + ': ' + message[i]);
		}
		else{

			res.write(username[i] + ': ' + message[i] + '\n');
		}
//		res.write('\n');
		}
	}
	else if(username.length === 1){
		res.write(username[0]+': '+message[0]);
		console.log('testing');
	}
	else{
		res.write('');
	}
	*/
	res.end();
});
server.listen(process.env.PORT || 8080);
//server.listen(8080);




















