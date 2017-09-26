/**
 * Created by s.t.o.k.a.t.o on 05.09.2017.
 */

module.exports = (connection, options, callback) => {
    "use strict";
    
    let query = 'SELECT * FROM messages WHERE vid_from = ? OR vid_to = ? ORDER BY timestamp DESC LIMIT ?';
    
    let values = [options.vid, options.vid, options.limit];
    
    connection.query(query, values, function (error, results, fields) {
        if (error) {
            console.error('Не удалось получить историю сообщений из базы данных');
            console.error(error);
    
            return callback(error);
        }
        
        // console.log('The solution is: ', results[0].solution);
        callback(null, results);
    });
};

