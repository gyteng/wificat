var log4js     = require('log4js');

var express = require('express');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var flash = require('express-flash');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var multer     = require('multer');
var bodyParser = require('body-parser');
var config     = require('./config.js').conf;
var route      = require('./db/route.js');
var token      = require('./db/token.js');
var user       = require('./user/route.js');
var manager = require('./manager/app.js');

var logPIN = log4js.getLogger('PIN');

var app = express();
app.use(multer());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cookieParser());
app.use(session({secret: 'gyteng', cookie: { maxAge: 60000 }}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// js and css file
app.use(express.static(__dirname));
app.use('/bower_components', express.static(__dirname + '/bower_components'));

app.get('/login', user.login);
app.post('/login', user.password);

app.get('/auth', user.auth);

app.get('/portal', user.portal);

app.get('/ping', user.ping);

app.get('/gw_message.php', function(req, res) {
    res.sendFile('gw_message.html', {
            root: __dirname
        },
        function(err) {
            if (err) {
                res.sendStatus(404);
            }
        }
    );
});

app.get('/plugins/:routeId', user.plugins);

// app.use('/', manager.router);

app.get('/',
    function(req, res) {
        res.sendFile('./manager/html/login.html', {
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

app.post('/',
  passport.authenticate('local', { successRedirect: '/manager',
                                   failureRedirect: '/'})
);

// app.all('/manager', function(req, res, next) {
//     if (req.isAuthenticated()) {
//         res.send('GG');
//     } else {
//         res.send('QQ');
//     }
// });

app.use('/manager', manager.router);

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

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});


app.listen(50006);