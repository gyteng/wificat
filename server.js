var log4js  = require('log4js');
var config  = require('./config.js').conf;
var express = require('express');

var password = require('./db/password.js');
var route   = require('./db/route.js');
var logger  = log4js.getLogger('PIN');
var user = require('./user/route.js');

var app = express();
app.use(express.static(__dirname));
app.use('/bower_components', express.static(__dirname + '/bower_components'));

app.get('/login/', user.login,
    function (req, res, next) {
        console.log('login');
        console.log(req.query);
        // res.redirect('http://192.168.10.1:2060/wifidog/auth?token=1234567890');
        if(req.query.pwd) {
            if(req.query.pwd === 'junjunjun') {
                res.redirect('http://192.168.11.1:2060/wifidog/auth?token=1234567890');
            } else {
                res.sendfile('./authfail.html');
            }
        } else {
            res.sendfile('./auth.html');
        }
    }
);

app.get('/auth', user.auth,

 function (req, res) {
    console.log('auth');
    console.log(req.query);
    // if()
    res.send('Auth: 1');
});

app.get('/ping', function(req, res) {
    if (!req.query.gw_id) { return; }
    route.getRoute(req.query.gw_id).then(function(data) {
        if (!data) { return; }
        logger.info('Receive "Ping" from [' + data.routeId + ']');
        // logger.info('Receive "Ping" from [' + data.routeId + ']:\n' + JSON.stringify(req.query, null, 4));
        res.send('Pong');
    });
});

app.get('/portal', user.portal,
 function (req, res) {
    console.log(req.url);
    res.sendfile('./authsuccess.html');
});

app.listen(50006);