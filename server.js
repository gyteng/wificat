var express = require('express');
var app = express();

app.use(express.static(__dirname));
app.use('/bower_components',  express.static(__dirname + '/bower_components'));

app.get('/login', function (req, res) {
    console.log('login');
    console.log(req.query);
    // res.redirect('http://192.168.10.1:2060/wifidog/auth?token=1234567890');
    res.sendfile('./auth.html');
});

// app.get('/portal', function (req, res) {
//     console.log('auth');
//     console.log(req.query);
//     res.send('Auth: 1');
// });

app.get('/ping', function (req, res) {
    console.log(req.url);
    res.send('Pong');
});

// app.get('*', function (req, res) {
//     console.log('****');
//     console.log(req.url);
//     console.log(req.query);
// });



app.listen(50006);