var express = require('express');
var app = express();
var mongo = require('./db/password.js');

app.use(express.static(__dirname));
app.use('/bower_components',  express.static(__dirname + '/bower_components'));

app.get('/login', function (req, res) {
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
    
});

app.get('/auth', function (req, res) {
    console.log('auth');
    console.log(req.query);
    // if()
    res.send('Auth: 1');
});

app.get('/ping', function (req, res) {
    console.log(req.url);
    res.send('Pong');
});

app.get('/portal', function (req, res) {
    console.log(req.url);
    res.sendfile('./authsuccess.html');
});

// app.get('*', function (req, res) {
//     console.log('****');
//     console.log(req.url);
//     console.log(req.query);
// });

app.listen(50006);

// var mongo = require('./db/password.js');
// mongo.addPassword('junjun');