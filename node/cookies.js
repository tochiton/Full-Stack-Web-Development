var http = require('http'); // do not change this line

// create a server just like in the first exercise
// as shown in the examples, you are asked to respond to various requests in different ways
// you have seen how to handle cookies before, this will use cookies more thoroughly

// examples which serve as a specification for the required features, note that they have an order:
//   http://localhost:8080/hello should return 'you must be new' in plain text and set an ident cookie
//   http://localhost:8080/test should return 'last time you visited /hello' in plain text
//   http://localhost:8080/world should return 'last time you visited /test' in plain text
//   [now sending requests from a different browser]
//   http://localhost:8080/lorem should return 'you must be new' in plain text and set an ident cookie
//   http://localhost:8080/moshimoshi should return 'last time you visited /lorem' in plain text
//   http://localhost:8080/ipsum should return 'last time you visited /moshimoshi' in plain text
//   [sending requests from the original browser again]
//   http://localhost:8080/again should return 'last time you visited /world' in plain text
//   [the server restarts and looses all cookies]
//   http://localhost:8080/servus should return 'you must be new' in plain text and set an ident cookie

var server = http.createServer(function(req, res) {
    if(req.url === '/hello') {
        res.writeHead(200, {
            'Set-Cookie': 'my_cookie=' +req.url,
            'Content-Type': 'text/html'
        });
        res.write('you must be new');
        res.end();
        }
    }
);
server.listen(process.env.PORT || 8080);