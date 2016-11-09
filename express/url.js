'use strict';

var express = require('express'); // do not change this line
var bodyParser = require('body-parser');
//var multer = require('multer'); // v1.0.5
//var upload = multer(); // for parsing multipart/form-data

var server = express();
server.use(bodyParser.json()); // for parsing application/json
server.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

// create an express server just like in the first exercise
// as shown in the examples, you are asked to respond to various requests in different ways

server.get('/', function(req, res) {
    res.status(200);
    res.set({
        'Content-Type': 'text/plain'
    });
    res.write('you have accessed the root');
    res.end();
});

server.get('/test/*', function(req, res) {
    res.status(200);
    res.set({
        'Content-Type': 'text/plain'
    });
    var temp = req.url.slice(6);
    temp = decodeURIComponent(temp);
    res.write('you have accessed "' +temp+ '" within test');
    res.end();
});

server.get('/test/world', function(req, res) {
    res.status(200);
    res.set({
        'Content-Type': 'text/html'
    });
    res.write('you have accessed "world" within test');
    res.end();
});

server.get('/attributes', function(req, res) {
    res.status(200);
    res.set({
        'Content-Type': 'text/html'
    });
   // res.write('you have accessed "world" within test');

    var temp = req.query;
    var argument = req.url;
  //  var testing = req.query.array();
    console.log(argument.a);
    var values = req.url.slice(12);
    values = decodeURIComponent(values);
    values = values.replace(/=/gi,'</td><td>');
    values = values.replace(/&/gi,'</td></tr><tr><td>');

    if(values.length > 0){
        values = '<!DOCTYPE html><html><body><table border="1"><tr><td>' + values + '</td></tr></table></body></html>';
        res.write(values);
    }
    else{

        values = '<!DOCTYPE html><html><body><table border="1"></table></body></html>';
        res.write(values);
    }
    console.log(values);
  
    res.end();
});
/*
server.get('/attrib', upload.array(), function (req, res, next) {
    console.log(req.body);
    res.json(req.body);
});
*/
server.listen(process.env.PORT ||8080);




// examples which serve as a specification for the required features:
//   http://localhost:8080/ should return 'you have accessed the root' in plain text
//   http://localhost:8080/test/hello should return 'you have accessed "hello" within test' in plain text
//   http://localhost:8080/test/world should return 'you have accessed "world" within test' in plain text
//   http://localhost:8080/attributes?hello=world&lorem=ipsum should return the following as html (row order might differ)
//     <!DOCTYPE html>
//     <html>
//       <body>
//         <table border="1">
//           <tr><td>hello</td><td>world</td></tr>
//           <tr><td>lorem</td><td>ipsum</td></tr>
//         </table>
//       </body>
//     </html>
//   http://localhost:8080/attributes?first=1&second=2&third=3 should return the following as html (row order might differ)
//     <!DOCTYPE html>
//     <html>
//       <body>
//         <table border="1">
//           <tr><td>first</td><td>1</td></tr>
//           <tr><td>second</td><td>2</td></tr>
//           <tr><td>third</td><td>3</td></tr>
//         </table>
//       </body>
//     </html>