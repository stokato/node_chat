const https = require("https");
const fs = require("fs");
const express       = require('express');
const path          = require('path');

const io            = require('./io');
const config        = require('./config.json');
const crossDomain   = require('./lib/cross_dimain');

const options = {
    key: fs.readFileSync(config.paths.privkey),
    cert: fs.readFileSync(config.paths.fullchain)
};

let app = express();

app.use(express.static(path.join(__dirname, config.static)));

// app.use(getCert);

app.use(crossDomain);

app.use(function(req, res, next) {
    res.status(404);
    res.send({ error : 'Not found' });
});

app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.send({ error : err.message });
});

let server = https.createServer(options, app);

server.listen(config.server.port, function() {
    console.log('Sever running at: ' + config.server.host + ':' + config.server.port );
});

io.listen(server, function(err){
    console.log('Socket server listening on port :' + config.server.port);
});