'use strict';

var express = require('express'); // do not change this line
var passport = require('passport'); // do not change this line
var strategy = require('passport-http'); // do not change this line

passport.initialize();

// create an express server just like in the first exercise
// as shown in the examples, you are asked to implement authentication check
// use the passport middleware with the basic strategy from passport-http to solve this exercise
// note that since we are using the basic strategy, there is no need for a session
// should the server restart, a user that already authenticated will thus not need to login

// examples which serve as a specification for the required features:
//   http://localhost:8080/hello should return 'accessible to everyone' in plain text
//   http://localhost:8080/world should return 'only accessible when logged in' in plain text if user the user is authenticate,
//   otherwise will prompt for the username and password
//   http://localhost:8080/test should return 'only accessible when logged in' in plain text if user the user is authenticate,
//   otherwise will prompt for the username and password

var server = express();
/*
server.use(parser.urlencoded({
    extended: true
}));
server.use(parser.json());
*/
server.use(passport.initialize());
//server.use(server.router);

server.use(passport.session());


passport.use(new strategy.BasicStrategy(
    function(userid, password, done) {
      if(userid !=='test' || password !=='logmein'){
          return done(null, false);
      } 
        else 
          return done(null, userid);
    }
));

/*
server.get('/private',
    passport.authenticate('basic', { session: false }),
    function(req, res) {
        res.json(req.user);
    });
*/

/*
passport.use(new strategy(
    function(username, password, done) {
        if (username.valueOf() === 'username' &&
            password.valueOf() === 'password')
            return done(null, true);
        else
            return done(null, false);
    }
));

function loggedIn(req, res, next) {
    if (req.user) {
        next();
    } else {
        res.redirect('/login');
    }
}
server.get('/world', loggedIn, function(req, res, next) {
    // req.user - will exist
    // load user orders and render them
});
*/
server.get('/world',
    passport.authenticate('basic', { session: false }),
    function(req, res) {
        res.status(200);
        res.set({
            'Content-Type': 'text/plain'
        });
        res.write('only accessible when logged in');
        res.end();
    });
server.get('/test',
    passport.authenticate('basic', { session: false }),
    function(req, res) {
        res.status(200);
        res.set({
            'Content-Type': 'text/plain'
        });
        res.write('only accessible when logged in');
        res.end();
    });

/*
server.get('/world', passport.authenticate('http', session: false),
function (req, res) {
    
});
*/
/*
server.get('/login', function (req, res) {
 res.status(200);
 res.set({
 'Content-Type': 'text/html'
 });

    res.write('<!DOCTYPE html>');
    res.write('<html>');
    res.write('<body>');
    res.write('<form action="/new" method="post">');
    res.write('<input type="text" name="username">');
    res.write('<input type="text" name="password">');
    res.write('<input type="submit" value="submit">');
    res.write('</form>');
    res.write('</body>');
    res.write('</html>');

    res.end();
});
*/
/*
server.post('/new', function (req, res) {
    res.status(200);
    res.set({
        'Content-Type': 'text/plain'
    });
    var user = new User({ password: req.body.password, username: req.body.username })
    //username = req.body.username;
    //password = req.body.password;
   // console.log(username+' '+password);

    res.end();
});
*/

server.get('/hello', function (req, res) {
    res.status(200);
    res.set({
        'Content-Type': 'text/plain'
    });
    res.write('accessible to everyone');

    res.end();
});
server.listen(process.env.PORT || 8080);