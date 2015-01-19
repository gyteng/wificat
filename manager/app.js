var express = require('express');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var flash = require('express-flash');
var passport = require('passport');

var router = express.Router();
var LocalStrategy = require('passport-local').Strategy;
var route      = require('../db/route.js');

var app = express();
app.use(cookieParser());
app.use(session({secret: 'gyteng', cookie: { maxAge: 60000 }}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
// app.use(app.router);

exports.router = router;

router.get('/manager',
    function(req, res) {
        res.sendFile('./html/login.html', {
                root: __dirname
            },
            function(err) {
                if (err) {
                    res.sendStatus(404);
                }
            }
        );
    }
);

router.post('/manager',
  passport.authenticate('local', { successRedirect: '/ggg',
                                   failureRedirect: '/manager'})
);

passport.use(new LocalStrategy(
    function(username, password, done) {
        route.getRoute(username, function(err, user) {
            if (err) {
                return done(err);
            }
            if (!user) {
                return done(null, false, {
                    message: 'Incorrect username.'
                });
            }
            var myUser = JSON.parse(JSON.stringify(user));
            if (myUser.password !== password) {
                return done(null, false, {
                    message: 'Incorrect password.'
                });
            }
            return done(null, user);

        });
    }
));