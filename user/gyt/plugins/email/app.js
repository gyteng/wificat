var email   = require('emailjs');
var route     = require('../../../../db/route.js');
var routeName = 'gyt';

exports.init = function(req, res, next) {
    var random = Math.ceil(Math.random()*100000000000).toString();
    var time = new Date();
    time = time.setTime(time.getTime() + 60 * 60000);
    var password = {value: random, type : 2, time: time};
    route.addPassword(routeName, password, function(err, data) {
        if(err) {
            res.send('error');
            return;
        }
        // sendEmail(req.query.email, random, function(err, data) {
        //     if (err) {
        //         res.send('error');
        //     } else {
        //         res.send('success');
        //     }
        // });
    });



    
};

var sendEmail = function(address, data, cb) {
    var server = email.server.connect({
        user: '78089220',
        password: '****',
        host: 'smtp.qq.com',
        ssl: true
    });

    server.send({
        text: '本次上网密码为：' + data + '，一小时内有效。',
        from: 'Gyt <78089220@qq.com>',
        to: address,
        subject: 'Wi-Fi密码'
    }, cb);
};