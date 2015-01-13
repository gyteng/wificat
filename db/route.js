var mongoose = require('mongoose');
var Schema   = mongoose.Schema;
var config   = require('../config').conf;

mongoose.connect(config.mongo);
mongoose.connection.on('error',function (err) {
    console.error('Mongoose连接失败: ' + err);
});

var RouteSchema = new Schema({
    routeId   :String
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

exports.addRoute = function(routeId) {
    var route = new Route({ routeId: routeId });
    route.save(function (err) {
        if (err) return handleError(err);
        }
    );
};