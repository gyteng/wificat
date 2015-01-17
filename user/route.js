var log4js = require('log4js');
var logLOG = log4js.getLogger('LOG');
var logPWD = log4js.getLogger('PWD');
var logPIN = log4js.getLogger('PIN');
var logAUT = log4js.getLogger('AUT');
var logPOR = log4js.getLogger('POR');

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
        logAUT.info(req.url + '\n' + JSON.stringify(req.query, null, 4));
        app.auth(req, res, next);
    } catch (e) {
        logAUT.error(req.url + '\n' + JSON.stringify(req.query, null, 4));
        res.send('Error[' + req.query.gw_id + ']');
    }
};

exports.portal = function(req, res, next) {
    try {
        var app = require('./' + req.query.gw_id + '/app.js');
        logPOR.info(req.url + '\n' + JSON.stringify(req.query, null, 4));
        app.portal(req, res, next);
    } catch (e) {
        logPOR.error(req.url + '\n' + JSON.stringify(req.query, null, 4));
        res.send('Error[' + req.query.gw_id + ']');
    }
};

exports.ping = function(req, res, next) {
    try {
        var app = require('./' + req.query.gw_id + '/app.js');
        logPIN.info(req.url + '\n' + JSON.stringify(req.query, null, 4));
        app.ping(req, res, next);
    } catch (e) {
        logPIN.error(req.url + '\n' + JSON.stringify(req.query, null, 4));
        res.send('Error[' + req.query.gw_id + ']');
    }
};

exports.plugins = function(req, res, next) {
    try {
        var app = require('./' + req.params.routeId + '/app.js');
        app.plugins(req, res, next);
    } catch (e) {
        res.send('Error[' + req.params.routeId + ']');
    }
};