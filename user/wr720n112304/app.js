var fs    = require('fs');
var route = require('../../db/route.js');
var token = require('../../db/token.js');

exports.login = function(req, res, next) {
    fs.readFile('./user/wr720n112304/login.html', function(err,data) {
        if(err) {
            res.sendStatus(404);
            return;
        }
        res.send(data.toString().replace(/{{request}}/, req.url));
    });
};

exports.password = function(req, res, next) {
    if(req.body.pwd === 'junjunjun') {
        res.redirect('http://' + req.query.gw_address + ':' + req.query.gw_port + '/wifidog/auth?token=1234567890');
    } else {
        res.sendFile('failure.html', {
            root: __dirname
        }, function(err) {
            if (err) {
                res.sendStatus(404);
            }
        });
    }
};

exports.auth = function(req, res, next) {
    console.log(req.url);
    console.log(req.query);
    res.send('Auth: 1');
};

exports.portal = function(req, res, next) {
    res.sendFile('success.html', {
        root: __dirname
    }, function(err) {
        if (err) {
            res.sendStatus(404);
        }
    });
};