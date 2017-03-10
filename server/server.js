const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');
const socket = require('socket.io');
const path = require('path');

var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);

const PORT = process.env.PORT || 3000;

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/test');

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../public')));
app.use('/bundle', express.static(path.join(__dirname, '../bundle')));

io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('channel-name', (message) => console.log('we got the message', message));
  socket.on('checked', () => { 
    console.log('we got here'); 
    io.clients(function(err, clients) {
      if (err) { throw err; }
      console.log(clients);
    });
    socket.broadcast.emit('testCheck', {for: 'everyone'});        
  });
  

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });

});


server.listen(PORT, () => (console.log('we are listening on port', PORT)) );