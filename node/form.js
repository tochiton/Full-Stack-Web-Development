var http = require('http'); // do not change this line
var fs = require('fs');
// create a server just like in the first exercise
// as shown in the examples, you are asked to respond to various requests in different ways
// you will need to use a stream to retrieve the post data

// examples which serve as a specification for the required features, note that they have an order:
//   http://localhost:8080/form should return the form as shown below
//   http://localhost:8080/new should retrieve the post data, save the name / message and return 'thank you for your message' in plain text
//   http://localhost:8080/list should return the stored messages 'name: message' in plain text
//   http://localhost:8080/form should return the form as shown below
//   http://localhost:8080/new should retrieve the post data, save the name / message and return 'thank you for your message' in plain text
//   http://localhost:8080/list should return the stored messages 'name: message\nanother name: another message' in plain text
//   [the server restarts and looses all messages]
//   http://localhost:8080/list should return '' in plain text

/*
res.writeHead(200, {
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
*/
var body = [];


var server = http.createServer(function(req, res) {
    if (req.url === '/form') {
        res.writeHead(200, {
            'Content-Type': 'text/html'
        });

        res.write('<!DOCTYPE html>');
        res.write('<html>');
        res.write('<body>');
        res.write('<form action="/new" method="post">');
        res.write('<input type="text" name="name" value="">');
        res.write('<input type="text" name="message">');
        res.write('<input type="submit" value="submit">');
        res.write('</form>');
        res.write('</body>');
        res.write('</html>');

        res.end();
    }
    else if (req.url === '/new') {
        res.writeHead(200, {
            'Content-Type': 'text/plain'
        });

        var hearder = req.headers;
        var method = req.method;
        var url = req.url;

        var b = 0;

        req.on('error', function (err) {
            console.error(err);
        }).on('data', function (chunk) {

            var a = Utf8ArrayToStr(chunk);


            var writableStream = fs.createWriteStream('store.txt');
            writableStream.write(a);


        }).on('end', function () {
            body = Buffer.concat(body).toString();
            res.write('thank you for your message');
            res.end();
        })
    }
    else if (req.url === '/list') {
        res.writeHead(200, {
            'Content-Type': 'text/plain'
        });

        var array = fs.readFileSync('store.txt').toString().split("\n");
        for (i in array) {
            console.log(array[i]);
        }
    }
});

function submitButton_Clicked() {
    var a =0
}

function Utf8ArrayToStr(array) {
    var out, i, len, c;
    var char2, char3;

    out = "";
    len = array.length;
    i = 0;
    while(i < len) {
        c = array[i++];
        switch(c >> 4)
        {
            case 0: case 1: case 2: case 3: case 4: case 5: case 6: case 7:
            // 0xxxxxxx
            out += String.fromCharCode(c);
            break;
            case 12: case 13:
            // 110x xxxx   10xx xxxx
            char2 = array[i++];
            out += String.fromCharCode(((c & 0x1F) << 6) | (char2 & 0x3F));
            break;
            case 14:
                // 1110 xxxx  10xx xxxx  10xx xxxx
                char2 = array[i++];
                char3 = array[i++];
                out += String.fromCharCode(((c & 0x0F) << 12) |
                    ((char2 & 0x3F) << 6) |
                    ((char3 & 0x3F) << 0));
                break;
        }
    }

    return out;
}

server.listen(process.env.PORT || 8080);









