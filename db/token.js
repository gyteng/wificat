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

exports.addToken = function(routeId, mac, validTime, cb) {
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
        if (err) { cb(null); return; }
        cb(newToken);
    });
};

exports.checkToken = function(token, cb) {
    mongoose.model('Token')
    .findOne({token: token})
    .exec(function(err, data) {
        if(err) { cb(null); return; }
        if(!data) { cb(null); return; }
        validTime = data.validTime;
        var now = new Date();
        if(now > validTime) { cb(null); return; }
        cb('AuthSuccess');
    });
};

exports.checkMac = function(routeId, mac, cb) {
    mongoose.model('Token')
    .findOne({
        routeId : routeId,
        mac     : mac
    })
    .sort('-validTime')
    .exec(function(err, data) {
        if(err) { cb(null); return; }
        if(!data) { cb(null); return; }
        validTime = data.validTime;
        var now   = new Date();
        if(now > validTime) { cb(null); return; }
        cb(data.token);
    });
};