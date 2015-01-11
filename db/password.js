var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

mongoose.connect('mongodb://127.0.0.1/wificat');
mongoose.connection.on('error',function (err) {
    logger.error('Mongoose连接失败: ' + err);
});

var PasswordSchema = new Schema({
    routeId   :String,
    password  :String,
    expiryDate: { type:Date }
});

var Password = mongoose.model('Password', PasswordSchema);

exports.getPassword = function(myPassword) {
    return mongoose.model('Password')
    .findOne({password: myPassword})
    .exec();
};

exports.addPassword = function(myPassword) {
    var password = new Password({ password: myPassword });
    password.save(function (err) {
        if (err) return handleError(err);
        }
    );
};