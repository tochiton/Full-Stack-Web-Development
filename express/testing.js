/**
 * Created by doanh on 7/27/16.
 */


var express = require('express');
var compression = require('compression');  //install compresion
var server = express();

server.use(compression({
    'threshold' : 0,
    'filter': function (req, res) {
        if(req.origianlUrl ==='/uncompressed'){
    return false;
}
    return compression.filter(req, res);
}}));

server.use(function (req, res, next) {
    console.log('incoming connection');
    console.log(req.originalUrl);
    next();

})

server.get('/', function(req, res) {
    res.status(200);
    res.write('hello\nworld\n');
    res.end();
});
server.listen(8080);