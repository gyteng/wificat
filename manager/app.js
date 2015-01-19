var express    = require('express');
var router = express.Router();

exports.router = router.get('/',
    function(req, res) {
        res.send('GG');
    }
);