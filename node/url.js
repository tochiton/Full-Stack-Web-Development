var http = require('http'); // do not change this line
var url = require('url'); // do not change this line
var querystring = require('querystring'); // do not change this line

var http = require('http');
var server = http.createServer(function(req, res) {
    if (req.url === '/') {
        res.writeHead(200, {
            'Content-Type': 'text/plain'
        });
        res.write('you have accessed the root');
        res.end();
    }
    else if (req.url === '/test/hello') {
        res.writeHead(200, {
            'Content-Type': 'text/plain'
        });
        res.write('you have accessed hello within the test');
        res.end();
    }
    else if (req.url === '/test/world') {
        res.writeHead(200, {
            'Content-Type': 'text/plain'
        });
        res.write('you have accessed world within the test');
        res.end();
    }
    else {
        res.writeHead(200, {
            'Content-Type': 'text/plain'
        });
        var temp = url.parse(req.url, true);
        var query = temp.query;

        console.log(query.valueOf());
        temp = querystring.stringify(query,',',':');
        var array = temp.split(',');
        console.log(temp);
        console.log(array);

        console.log('-------');

        console.log(query);
        
        res.end();
    }
    /*
    else if (req.url.indexOf('/test/') === 0) {
        res.writeHead(200, {
            'Content-Type': 'text/plain'
        });
        res.write('test: ' + decodeURIComponent(req.url.substr(6)));
    } else {
        res.end();
    }
    */
});
server.listen(8080);


// create a server just like in the first exercise
// as shown in the examples, you are asked to respond to various requests in different ways

// examples which serve as a specification for the required features:
//   http://localhost:8080/ should return 'you have accessed the root' in plain text
//   http://localhost:8080/test/hello should return 'you have accessed hello within test' in plain text
//   http://localhost:8080/test/world should return 'you have accessed world within test' in plain text
//   http://localhost:8080/attributes?hello=world&lorem=ipsum should return the following as html
//     <!DOCTYPE html>
//       <html>
//       <body>
//         <table border="1">
//           <tr>
//             <td>hello</td>
//             <td>world</td>
//           </tr>
//           <tr>
//             <td>lorem</td>
//             <td>ipsum</td>
//           </tr>
//         </table>
//       </body>
//     </html>
//   http://localhost:8080/attributes?first=1&second=2&third=3 should return the following as html
//     <!DOCTYPE html>
//       <html>
//       <body>
//         <table border="1">
//           <tr>
//             <td>first</td><td>1</td>
//           </tr>
//           <tr>
//             <td>second</td><td>2</td>
//           </tr>
//           <tr>
//             <td>third</td><td>3</td>
//           </tr>
//         </table>
//       </body>
//     </html>