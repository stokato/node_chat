/**
 * Created by s.t.o.k.a.t.o on 05.09.2017.
 */

const uuid4 = require('uuid/v4');
const md5   = require('md5');

const sanitize = require('./sanitize');

const Config     = require('./../../config.json');

/**
 * Отправляет сообщение
 *  - выполняет проверку токена вк
 *  - формирует объект сообщения
 *  - отпрвляет всем клиентам
 *
 * @param socket            сокет
 */
module.exports = function (socket) {
    socket.on('message', function(options) { options = options || {};
        if(options['auth_key'] !== md5(Config.auth.APIID + "_" + options.vid_from + "_" + Config.auth.APISECRET)) {
            return;
        }
        
        let message = {
            chat_vid: sanitize(options.chat_vid),
            vid_from: sanitize(options.vid_from),
            vid_to: sanitize(options.vid_to),
            message_text: sanitize(options.message_text),
            message_id: uuid4(),
            type: sanitize(options.type),
            params: options.params
        };
    
        socket.broadcast.emit('message', message);
        socket.emit('message', message);
    });
};


