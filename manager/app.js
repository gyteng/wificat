var express = require('express');
var router = express.Router();

exports.router = router;

router.get('/', function (req, res, next) {
	if (req.isAuthenticated()) {
        res.send('GG');
    } else {
        res.send('QQ');
    }
});
