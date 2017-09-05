/**
 * Created by s.t.o.k.a.t.o on 05.09.2017.
 */

module.exports = (connection, message, callback) => {
    "use strict";
    
    let query = 'INSERT INTO chat_db.messages (chat_vid, vid_from, vid_to, message_text, message_id, type) ' +
        'VALUES (?, ?, ?, ?, ?, ?)';
    
    let values = [ message.chat_vid, message.vid_from, message.vid_to,
        message.message_text, message.message_id, message.type];
    
    connection.query(query, values, function (error, results, fields) {
        if (error) {
            console.error('Не удалось записать сообщение в базу данных');
            console.error(error);
    
            return callback(error);
        }
        
        // console.log('The solution is: ', results[0].solution);
        callback(null, results);
    });
};