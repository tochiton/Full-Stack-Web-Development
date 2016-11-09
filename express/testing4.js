/**
 * Created by doanh on 8/7/16.
 */
var express = require('express');
var http = require('http');
var path = require('path');
var swig = require('swig');
var passport = require('passport');

var LocalStrategy = require('passport-local').Strategy;

passport.serializeUser(function(user, done) {
    console.log('Serialize user called.');
    done(null, user.name);
});

passport.deserializeUser(function(id, done) {
    console.log('Deserialize user called.');
    return done(null, {name: 'Oliver'});
});

passport.use(new LocalStrategy(
    function(username, password, done) {
        console.log('local strategy called with: %s', username);
        return done(null, {name: username});
    }));

var app = express();

app.set('port', process.env.PORT || 3000);
app.set('view engine', 'swig');
app.set('views', __dirname + '/views');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.cookieParser('asljASDR2084^^!'));
app.use(express.session());
app.use(passport.initialize());
app.use(passport.session());
app.use(app.router);
app.use(require('less-middleware')({ src: __dirname + '/public' }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.errorHandler({ dumpExceptions:true, showStack:true }));

app.engine('swig', swig.renderFile);

app.post('/auth', passport.authenticate('local'));
app.get('/login', function(req, res) {
    // login is a simple form that posts username and password /auth
    res.render('login', {});
});

http.createServer(app).listen(app.get('port'), function(){
    console.log('Express server listening on port ' + app.get('port'));
});

