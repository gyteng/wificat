var email   = require('emailjs');
var route     = require('../../../../db/route.js');
var routeName = 'gyt';
var log4js = require('log4js');
var logPLU = log4js.getLogger('PLU');

exports.init = function(req, res, next) {
    var random = Math.ceil(Math.random()*100000000000).toString();
    var passwordPretty = random.substring(0,4) + ' ' + random.substring(4,8) + ' ' + random.substring(8);
    var time = new Date();
    time = time.setTime(time.getTime() + 60 * 60000);
    var password = {value: random, type : 2, time: time};
    route.addPassword(routeName, password, function(err, data) {
        if(err) {
            res.send(err);
            return;
        }
        sendEmail(req.query.email, random, function(err, data) {
            logPLU.info('[' + req.query.email + ']');
            if (err) {
                console.log(err);
                res.send(err);
            } else {
                res.send('success');
            }
        });
    });



    
};

var sendEmail = function(address, data, cb) {
    var server = email.server.connect({
        user: '78089220@qq.com',
        password: '******',
        host: 'smtp.qq.com',
        ssl: true
    });

    server.send({
        text: '本次上网密码为：' + data.substring(0,4) + ' ' + data.substring(4,8) + ' ' + data.substring(8) + '，一小时内有效。',
        from: 'Gyt <78089220@qq.com>',
        to: '<' + address + '>',
        subject: 'Wi-Fi密码'
    }, cb);
};