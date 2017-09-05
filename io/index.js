const socketio  =  require('socket.io');

const sendMessage = require('./lib/send_message');

let io = null;                                      // Сокет

/*
 При подключении вешаем эмиттеры
 */
module.exports.listen = function(server, callback) {
    io = socketio.listen(server);
    //io.set('log level', 1);
    io.set('origins', '*:*'); // 'dev.foo.com:* foo.com:* 10.10.17.252:* www.foo.com:* https://dev.foo.com:* https://foo.com:* https://10.10.17.252:* https://www.foo.com:*'
    
    io.sockets.on('connection', function (socket) {
        sendMessage(socket);
    });
    
    callback();
};

