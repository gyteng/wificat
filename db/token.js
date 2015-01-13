 var mongoose = require('mongoose');
 var Schema   = mongoose.Schema;
 var config   = require('../config').conf;
 var crypto = require('crypto');

mongoose.connect(config.mongo);
mongoose.connection.on('error',function (err) {
    console.error('Mongoose连接失败: ' + err);
});

var TokenSchema = new Schema({
    routeId   :String,
    mac       :String,
    token     :String,
    systemTime:{type:Date,default:Date.now},
    validTime :{type:Date}
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

exports.addToken = function(routeId, mac, validTime) {
    var now = new Date();
    var md5 = crypto.createHash('md5');
    var newToken =  md5.update('' + routeId + mac + now).digest('hex');

    var token = new Token({
        routeId: routeId,
        mac: mac,
        validTime: validTime,
        token: newToken
    });
    token.save(function(err) {
        if (err) { return handleError(err); }
    });
};