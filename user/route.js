var wr720n112304 = require('./wr720n112304/app.js');

exports.login = function(req, res, next) {
    var app = require('./' + req.query.gw_id + '/app.js');
    app.login(req, res, next);
};

exports.auth = function(req, res, next) {
    var app = require('./' + req.query.gw_id + '/app.js');
    app.auth(req, res, next);
};

exports.portal = function(req, res, next) {
    var app = require('./' + req.query.gw_id + '/app.js');
    app.portal(req, res, next);
};