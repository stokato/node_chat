const http = require("http");
const Config = require('./config.json').server;
const path = require("path");
const fs = require("fs");

// let server = http.createServer();

var server = http.createServer( function(req, res) {
    
    var localPath;
    if(req.method == 'GET') {
        
        localPath = path.join(__dirname, '/public/', "index.html");
        
        fs.exists(localPath, function(exists) {
            if(exists) {
                getFile(localPath, res, "text/html");
            } else {
                console.log("File not found: " + localPath);
                res.writeHead(404);
                res.end();
            }
        });
    }
    
});

server.listen(Config.port, function() {
    require('./io').listen(server, function(){
        console.log('server running at: ' + Config.host + ':' + Config.port);
    });
});


function getFile(localPath, res, mimeType) {
    fs.readFile(localPath, function(err, contents) {
        if(!err) {
            res.setHeader("Content-Length", contents.length);
            res.setHeader("Content-Type", mimeType);
            res.statusCode = 200;
            res.end(contents);
        } else {
            res.writeHead(500);
            res.end();
        }
    });
}