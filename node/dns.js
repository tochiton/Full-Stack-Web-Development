var http = require('http'); // do not change this line
var dns = require('dns'); // do not change this line

// create a server just like in the first exercise
// as shown in the examples, you are asked to respond to various requests in different ways
// this is an example of using an external resource

// examples, note that the addresses / the order of the addresses may be different:
//   http://localhost:8080/pdx.edu should return '131.252.115.150' in plain text
//   http://localhost:8080/coderect.com should return '216.239.36.21\n216.239.38.21\n216.239.32.21\n216.239.34.21' in plain text
//   http://localhost:8080/error should return 'error' in plain text