var mongoose = require('mongoose');
var Schema   = mongoose.Schema;
var config   = require('../config').conf;

mongoose.connect(config.mongo);
mongoose.connection.on('error',function (err) {
    console.error('Mongoose连接失败: ' + err);
});

var TokenSchema = new Schema({
    routeId   :String,
    mac       :String,
});

var Token = mongoose.model('Token', TokenSchema);

// exports.getRoute = function(myId) {
//     return mongoose.model('Route')
//     .findOne({routeId: myId})
//     .exec();
// };

// exports.getPassword = function(myId, password) {
//     return mongoose.model('Route')
//     .findOne({routeId: myId})
//     .where('auth.junjunjun').exists()
//     .exec();
// };

exports.addRoute = function(myId) {
    var token = new Token({ routeId: myId });
    route.save(function (err) {
        if (err) return handleError(err);
        }
    );
};