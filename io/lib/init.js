/**
 * Created by s.t.o.k.a.t.o on 25.09.2017.
 */
const md5   = require('md5');

const Config        = require('./../../config.json');
const vidList       = require ('../vid_list');

/**
 * Добавляет vid клиента с список vidList
 *
 * @param socket        сокет
 */
module.exports = function (socket) {
    socket.on('init', function(options) { options = options || {};
        if(options['auth_key'] !== md5(Config.auth.APIID + "_" + options.vid + "_" + Config.auth.APISECRET)) {
            return;
        }
        
        if (!vidList[options.vid]) {
            vidList[options.vid] = socket;
        }
    });
};