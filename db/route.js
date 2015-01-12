var mongoose = require('mongoose');
var Schema   = mongoose.Schema;
var config   = require('../config').conf;

mongoose.connect(config.mongo);
mongoose.connection.on('error',function (err) {
    console.error('Mongoose连接失败: ' + err);
});

var RouteSchema = new Schema({
    routeId   :String,
    password  :String
});

var Route = mongoose.model('Route', RouteSchema);

exports.getRoute = function(myId) {
    return mongoose.model('Route')
    .findOne({routeId: myId})
    .exec();
};

exports.addRoute = function(myId) {
    var route = new Route({ routeId: myId });
    route.save(function (err) {
        if (err) return handleError(err);
        }
    );
};