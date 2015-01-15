var log4js = require('log4js');
var logLOG = log4js.getLogger('LOG');
var logPWD = log4js.getLogger('PWD');

exports.login = function(req, res, next) {
    try {
        var app = require('./' + req.query.gw_id + '/app.js');
        logLOG.info(req.url + '\n' + JSON.stringify(req.query, null, 4));
        app.login(req, res, next);
    } catch (e) {
        logLOG.error(req.url + '\n' + JSON.stringify(req.query, null, 4));
        res.send('Error[' + req.query.gw_id + ']');
    }
};

exports.password = function(req, res, next) {
    try {
        var app = require('./' + req.query.gw_id + '/app.js');
        logPWD.info(req.url + '\n' + JSON.stringify(req.query, null, 4) + '\n' + JSON.stringify(req.body, null, 4));
        app.password(req, res, next);
    } catch (e) {
        logPWD.error(req.url + '\n' + JSON.stringify(req.query, null, 4) + '\n' + JSON.stringify(req.body, null, 4));
        res.send('Error[' + req.query.gw_id + ']');
    }
};

exports.auth = function(req, res, next) {
    try {
        var app = require('./' + req.query.gw_id + '/app.js');
        app.auth(req, res, next);
    } catch (e) {
        console.log(e);
        res.send('Error[' + req.query.gw_id + ']');
    }
};

exports.portal = function(req, res, next) {
    try {
        var app = require('./' + req.query.gw_id + '/app.js');
        app.portal(req, res, next);
    } catch (e) {
        console.log(e);
        res.send('Error[' + req.query.gw_id + ']');
    }
};

exports.qrcode = function(req, res, next) {
    try {
        var app = require('./' + req.params.routeId + '/app.js');
        app.qrcode(req, res, next);
    } catch (e) {
        console.log(e);
        res.send('Error[' + req.params.routeId + ']');
    }
};