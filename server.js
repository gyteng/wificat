var log4js  = require('log4js');
var config  = require('./config.js').conf;
var express = require('express');
var bodyParser = require('body-parser');
var multer = require('multer');

var route   = require('./db/route.js');
var logger  = log4js.getLogger('PIN');
var user = require('./user/route.js');

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(multer());
app.use(express.static(__dirname));
app.use('/bower_components', express.static(__dirname + '/bower_components'));

app.get('/login', user.login);
app.post('/login', user.password);

app.get('/auth', user.auth);

app.get('/portal', user.portal);

app.get('/ping', function(req, res) {
    if (!req.query.gw_id) { return; }
    route.getRoute(req.query.gw_id).then(function(data) {
        if (!data) { return; }
        logger.info('Receive "Ping" from [' + data.routeId + ']');
        // logger.info('Receive "Ping" from [' + data.routeId + ']:\n' + JSON.stringify(req.query, null, 4));
        res.send('Pong');
    });
});

app.listen(50006);

// console.log('GG');
// route.getPassword('wr720n112304', 'junjunjun1', function(data) {
//     console.log(data);
// });