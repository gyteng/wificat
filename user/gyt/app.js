var fs        = require('fs');
var async     = require('async');
var route     = require('../../db/route.js');
var token     = require('../../db/token.js');

var routeName = 'gyt';

// 检查密码，正确则返回token
var checkPassword = function(password, mac, cb) {
    route.getPassword(routeName, password, function(err, data) {
        if(err) {
            cb(err); return;
        }
        if(data.type === 1) {
            var validTime = new Date();
            validTime.setTime(validTime.getTime() + data.time * 60000);
            token.addToken(routeName, mac, validTime, cb);
        } else if (data.type === 2) {
            route.removePassword(routeName, password, function(err, data) {
                if(err) {
                    cb(err);
                    return;
                }
                token.addToken(routeName, mac, data.time, cb);
            });
        } else {
            cb(err); return;
        }
    });
};

var createDatabase = function(cb) {

};

exports.login = function(req, res, next ) {
    token.checkMac(routeName, req.query.mac, function(err, myToken) {
        if (err) {
            route.getList(routeName, req.query.mac, function(err, list) {
                var welcome = '';
                if (err || !list.name) {
                } else {
                    welcome = '<h3>你好，' + list.name + '<h3><br>';
                }
                fs.readFile('./user/' + routeName + '/login.html', function(err, data) {
                    if (err) {
                        res.sendStatus(404);
                        return;
                    }
                    res.send(data.toString().replace(/{{request}}/, req.url).replace(/{{welcome}}/, welcome));
                });
                return;
            });
            return;
        }
        res.redirect('http://' + req.query.gw_address + ':' + req.query.gw_port + '/wifidog/auth?token=' + myToken);
    });
};

exports.password = function(req, res, next) {
    checkPassword(req.body.pwd, req.query.mac, function(err, token) {
        if(err) {
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
    token.checkToken(req.query.token, function(err, data) {
        if(err) {
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

exports.ping = function(req, res, next) {
    route.getRoute(routeName, function(err, data) {
        if (err) {

        } else if (!data) {

        } else {
            res.send('Pong');
        }
    });
};

exports.qrcode = function(req, res, next) {
    var random = Math.ceil(Math.random()*100000000000).toString();
    var passwordPretty = random.substring(0,4) + '&nbsp;' + random.substring(4,8) + '&nbsp;' + random.substring(8);
    var time = new Date();
    time = time.setTime(time.getTime() + 60 * 60000);
    var password = {value: random, type : 2, time: time};
    route.addPassword(routeName, password, function(err, data) {
        if(!err) {
            fs.readFile('./user/' + routeName + '/qrcode.html', function(err, data) {
                if (err) {
                    res.sendStatus(404);
                    return;
                }
                res.send(data.toString().replace(/{{password}}/, passwordPretty));
            });
        }
    });
};

