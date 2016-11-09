var http = require('http');
var fs = require('fs');
var con = require('connect');

//404 response
function send404response(response) {
    response.writeHead(404, {"Content-Type":"text/plain"});
    response.write('Error 404');
    response.end();
}


function onRequest(request, response) {
    if(request.method =='GET' && request.url ==='/'){
        response.writeHead(404, {"Content-Type":"text/html"});
        fs.createReadStream("./index.html").pipe(response);
    }
    else{
        send404response(response);
    }

    response.end();
}

http.createServer(onRequest).listen(8888);
console.log('Server is running')
