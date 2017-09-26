/**
 * Created by s.t.o.k.a.t.o on 05.09.2017.
 */

const md5   = require('md5');

const sanitize = require('./sanitize');
const db = require('./../../db');
const vidList = require('./../vid_list');

const Config     = require('./../../config.json');

/**
 * Отправляет сообщение
 *  - выполняет проверку токена вк
 *  - сохраняет сокет в список vidList
 *  - формирует объект сообщения
 *  - отпрвляет клиенту с указанным vid
 *
 * @param socket            сокет
 */
module.exports = function (socket) {
    socket.on('history', function(options) { options = options || {};
        if(options['auth_key'] !== md5(Config.auth.APIID + "_" + options.vid + "_" + Config.auth.APISECRET)) {
            return;
        }
        
        if (!vidList[options.vid]) {
            vidList[options.vid] = socket;
        }
        
        let params = {
            vid: options.vid,
            limit: 20
        };
        
        db.getConnection().getHistory(params, (err, res) => {
            "use strict";
            
            if (err) {
                return console.error('Ошибка при получении истории из БД');
            }
            
            socket.emit('history', res);
        });
    });
};


