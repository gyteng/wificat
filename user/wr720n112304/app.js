var fs    = require('fs');
var route = require('../../db/route.js');
var token = require('../../db/token.js');

var checkPassword = function(password, mac, cb) {
    route.getPassword('wr720n112304', password, function(data) {
        if(!data) {
            cb(null);
            return;
        }
        if(data.type === 1) {
            var validTime = new Date();
            validTime.setTime(validTime.getTime() + data.time * 60000);
            token.addToken('wr720n112304', mac, validTime, function(data) {
                cb(data);
            });
        }
    });
};

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
    checkPassword(req.body.pwd, req.query.mac, function(token) {
        if(!token) {
            res.sendFile('failure.html', {
                root: __dirname
            },
            function(err) {
                if (err) {
                    res.sendStatus(404);
                }
            });
            return;
        }
        res.redirect('http://' + req.query.gw_address + ':' + req.query.gw_port + '/wifidog/auth?token=' + token);
    });



    // if(req.body.pwd === 'junjunjun') {
    //     res.redirect('http://' + req.query.gw_address + ':' + req.query.gw_port + '/wifidog/auth?token=1234567890');
    // } else {
    //     res.sendFile('failure.html', {
    //         root: __dirname
    //     }, function(err) {
    //         if (err) {
    //             res.sendStatus(404);
    //         }
    //     });
    // }
};

exports.auth = function(req, res, next) {
    console.log(req.url);
    console.log(req.query);
    token.checkToken(req.query.token, function(data) {
        if(!data) {
            res.send('Auth: 0');
        } else {
            res.send('Auth: 1');
        }
    });
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

