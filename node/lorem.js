var http = require('http'); // do not change this line

// create a server that listens on port: process.env.PORT || 8080
// this is a shorthand for: use process.env.PORT if it is defined, otherwise use 8080
// you can thu suse port 8080 for developingthe, while the  test cases can secify which port they expect instead
// on a request, respond with a webpage containing '<!DOCTYPE html><html><body>lorem ipsum</body></html>'

var server = http.createServer(function(req, res) {
        res.writeHead(200, {
            'Content-Type': 'text/html'
        });
        res.write('<!DOCTYPE html><html><body>lorem ipsum</body></html>');
        res.end();
    }
);
server.listen(process.env.PORT || 8080);
