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
        } else if (data.type === 2) {
            route.removePassword('wr720n112304', password, function(err) {
                if(err) {
                    cb(null);
                    return;
                }
                token.addToken('wr720n112304', mac, data.time, function(data) {
                    cb(data);
                });
            });
        }
    });
};

exports.login = function(req, res, next) {
    console.log('login:');
    console.log(req.url);
    console.log(req.query);
    token.checkMac('wr720n112304', req.query.mac, function(token) {
        if(token) {
            res.redirect('http://' + req.query.gw_address + ':' + req.query.gw_port + '/wifidog/auth?token=' + token);
            return;
        } else {
            fs.readFile('./user/wr720n112304/login.html', function(err, data) {
                if (err) {
                    res.sendStatus(404);
                    return;
                }
                res.send(data.toString().replace(/{{request}}/, req.url));
            });
        }
    });
    
};

exports.password = function(req, res, next) {
    console.log('Enter password: ' + req.body.pwd);
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

exports.qrcode = function(req, res, next) {
    var random = Math.ceil(Math.random()*100000000000).toString();
    var passwordPretty = random.substring(0,4) + '&nbsp;' + random.substring(4,8) + '&nbsp;' + random.substring(8);
    var password = {};
    var time = new Date();
    time = time.setTime(time.getTime() + 60 * 60000);
    password[random] = {type : 2, time: time};
    route.addPassword('wr720n112304', password, function(p) {
        if(p) {
            fs.readFile('./user/wr720n112304/qrcode.html', function(err, data) {
                if (err) {
                    res.sendStatus(404);
                    return;
                }
                res.send(data.toString().replace(/{{password}}/, passwordPretty));
            });
        }
    });
};

