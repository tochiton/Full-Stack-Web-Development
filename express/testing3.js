/**
 * Created by doanh on 8/7/16.
 */
var express = require('express')
    , http = require('http')
    , path = require('path')
    , passport = require('passport')
    , LocalStrategy = require('passport-local').Strategy;

var app = express();

passport.use(new LocalStrategy(function(username, password, done) {
    // insert your MongoDB check here. For now, just a simple hardcoded check.
    if (username === 'foo' && password === 'bar')
    {
        done(null, { user: username });
    }
    else
    {
        done(null, false);
    }
}));

passport.serializeUser(function(user, done) {
    // please read the Passport documentation on how to implement this. We're now
    // just serializing the entire 'user' object. It would be more sane to serialize
    // just the unique user-id, so you can retrieve the user object from the database
    // in .deserializeUser().
    done(null, user);
});

passport.deserializeUser(function(user, done) {
    // Again, read the documentation.
    done(null, user);
});

app.use(express.bodyParser());
app.use(express.cookieParser());
app.use(express.session({ secret: 'secret' }));
app.use(passport.initialize());
app.use(passport.session());

// route to authenticate the user
app.post('/login', passport.authenticate('local', {
    successRedirect: '/accessed',
    failureRedirect: '/access'
}));

app.listen(3012);