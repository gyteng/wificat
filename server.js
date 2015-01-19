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