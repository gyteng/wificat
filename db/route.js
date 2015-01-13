var mongoose = require('mongoose');
var Schema   = mongoose.Schema;
var config   = require('../config').conf;

mongoose.connect(config.mongo);
mongoose.connection.on('error',function (err) {
    console.error('Mongoose连接失败: ' + err);
});

var RouteSchema = new Schema({
    routeId   :String,
    auth      :Schema.Types.Mixed
});

var Route = mongoose.model('Route', RouteSchema);

exports.getRoute = function(routeId) {
    return mongoose.model('Route')
    .findOne({routeId: routeId})
    .exec();
};

exports.getPassword = function(routeId, password, cb) {
    mongoose.model('Route')
    .findOne({routeId: routeId})
    .where('auth.' + password).exists()
    .exec(function(err, data) {
        data = JSON.parse(JSON.stringify(data));
        if(err) { cb(null); return; }
        if(!data) { cb(null); return; }
        cb(data.auth[password]);
    });
};

exports.addPassword = function(routeId, password, cb) {
    mongoose.model('Route')
    .findOne({routeId: routeId}).exec(function(err, data) {
        if(!data) { cb(null); return; }
        for(var p in password) {
            data.auth[p] = password[p];
        }
        mongoose.model('Route')
        .findOneAndUpdate({
                routeId: routeId
            }, {auth: data.auth}, function(err) {
                if(err) { cb(null); return; }
                cb('password');
            }
        );
    });
};

exports.removePassword = function(routeId, password, cb) {
    mongoose.model('Route')
    .findOne({routeId: routeId}).exec(function(err, data) {
        if(!data) { cb(null); return; }
        var newPassword = {};
        for(var p in data.auth) {
            if(p !== password) {
                newPassword[p] = data.auth[p];
            }
        }
        mongoose.model('Route')
        .findOneAndUpdate({
                routeId: routeId
            }, {auth: newPassword}, cb
        );
    });
};

exports.addRoute = function(routeId) {
    var route = new Route({ routeId: routeId });
    route.save(function (err) {
        if (err) return handleError(err);
        }
    );
};