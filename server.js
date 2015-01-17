var log4js     = require('log4js');
var express    = require('express');
var multer     = require('multer');
var bodyParser = require('body-parser');
var config     = require('./config.js').conf;
var route      = require('./db/route.js');
var token      = require('./db/token.js');
var user       = require('./user/route.js');

var logPIN = log4js.getLogger('PIN');

var app = express();
app.use(multer());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

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

app.listen(50006);

// console.log('GG');
// route.addPassword('wr720n112304', {value: 'gytgytgyt', type: 1, time: 60}, function(err, data) {
//     console.log(err);
//     console.log(data);
// });

// route.getPassword('gyt', 'gggh', function(err, data) {
//     console.log(err);
//     console.log(data);
// });

// route.addRoute('gyt');

// var email   = require('emailjs');
// var server  = email.server.connect({
//    user:    "78089220",
//    password:"****",
//    host:    "smtp.qq.com",
//    ssl:     true
// });

// // send the message and get a callback with an error or details of the message that was sent
// server.send({
//    text:    "i hope this works",
//    from:    "you <78089220@qq.com>",
//    to:      "someone <igyteng@gmail.com>",
//    subject: "testing emailjs"
// }, function(err, message) { console.log(err || message); });


// thenjs(function(cb) {
//     console.log('GG');
//     cb(2, 1);
// }).then(function(cb, err, data) {
//     console.log('HH');
//     console.log(err);
//     console.log(data);
// }, function(cb, var1, var2) {
//     console.log('KK');
//     console.log(var1);
//     console.log(var2);
// })
// ;