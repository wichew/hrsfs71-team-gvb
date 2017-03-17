const express = require('express');
const mongoose = require('mongoose');
// const socket = require('socket.io');
const path = require('path');
const db = require('./db/index.js');

var app = express();
var server = require('http').createServer(app);
// var io = require('socket.io')(server);

const PORT = process.env.PORT || 3000;

// middleware body-parser, static files & morgan
require(path.join(__dirname, './middleware/config.js'))(app, express);
require(path.join(__dirname, './middleware/gamelogic.js'))(app, express, server);



server.listen(PORT, () => (console.log('we are listening on port', PORT)) );
