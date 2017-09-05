/**
 * Created by s.t.o.k.a.t.o on 05.09.2017.
 */

const mysql      = require('mysql');

const Config = require('./../config.json').db;
const saveMessage = require('./lib/save_message');

let _connection;
let _db = null;

module.exports.getConnection = () => {
    "use strict";
    
    if (!_db) {
        _db = new DB();
    }
    
    return _db;
};

class DB {
    constructor() {
        _connection = mysql.createConnection({
            host     : Config.host,
            user     : Config.user,
            password : Config.password,
            database : Config.database
        });
    }
    
    connect(callback) {
        _connection.connect(function(err) {
            if (err) {
                console.error('error connecting: ' + err.stack);
                return callback(err);
            }
        
            console.log('connected as id ' + _connection.threadId);
            
            callback(null, _connection.threadId);
        });
    }
    
    disconnect(callback) {
        _connection.end((err) => {
            if (err) {
                console.error('error disconnecting: ' + err.stack);
                return callback(err);
            }
            
            callback(null, null);
        });
    }
    
    saveMessage(message, callback) {
        saveMessage(_connection, message, callback);
    }
}