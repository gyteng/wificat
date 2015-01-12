exports.conf = {
    mongo: 'mongodb://127.0.0.1/wificat'
};

var log4js = require('log4js');
log4js.configure({
    appenders: [
        { type: 'console' },
        { type: 'dateFile', filename: 'logs/ping.log', pattern: '-yyyy-MM-dd', alwaysIncludePattern: false,category: 'PIN'}
    ]
});

Date.prototype.format = function (format) {
    var formatStrs = {
        'M+': this.getMonth() + 1,
        'd+': this.getDate(),
        'h+': this.getHours(),
        'm+': this.getMinutes(),
        's+': this.getSeconds(),
        'q+': Math.floor((this.getMonth() + 3) / 3),
        'S': this.getMilliseconds()
    };
    if (/(y+)/.test(format)) format = format.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length));
    for (var str in formatStrs)
        if (new RegExp('(' + str + ')').test(format))
            format = format.replace(RegExp.$1, RegExp.$1.length === 1 ? formatStrs[str] : ('00' + formatStrs[str]).substr(('' + formatStrs[str]).length));
    return format;
};