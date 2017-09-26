/**
 * Created by s.t.o.k.a.t.o on 25.09.2017.
 */

const Config        = require('./../../config.json');
const vidList       = require ('../vid_list');

/**
 * При отключении клиента удаляет его сокет из списка vidList
 *
 * @param socket        сокет
 */
module.exports = function (socket) {
    socket.on('disconnect', function() {
        for (let id in vidList) if (vidList.hasOwnProperty(id)) {
            if (vidList[id].id === socket.id) {
                return delete vidList[id];
            }
        }
    });
};