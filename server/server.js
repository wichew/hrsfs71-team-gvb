const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');
const socket = require('socket.io');
const path = require('path');

// connection to mongoDB
var db = require('./db/index.js');

var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);

const PORT = process.env.PORT || 3000;

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../public')));
app.use('/bundle', express.static(path.join(__dirname, '../bundle')));

var userArray = [];

io.on('connection', (socket) => {
  console.log('a user connected');
  userArray.push({ userID: socket.client.id, vote: false, key: socket.client.id });

  //send all to users
  socket.broadcast.emit('playerJoined', userArray);

  socket.emit('playerJoined', userArray);

  socket.on('channel-name', (message) => console.log('we got the message', message));

  socket.on('updateCheckArray', (array)=>{

    console.log('updateCheckArray', array);
    userArray = array;
    socket.broadcast.emit('upDateChecks', array);
  });

  socket.on('checked', () => {
    console.log('we got here');
    io.clients(function(err, clients) {
      if (err) { throw err; }
      console.log(clients);
    });
    console.log(userArray);
    socket.broadcast.emit('testCheck', userArray);
    // socket.emit('testCheck', userArray);
  });


  socket.on('disconnect', () => {
    for (var i = 0; i < userArray.length; i++) {
      if (userArray[i].userID === socket.client.id) {
        userArray.splice(i, 1);
        break;
      }
    }
    socket.broadcast.emit('upDateChecks', userArray);
    console.log('user disconnected');
  });

});


server.listen(PORT, () => (console.log('we are listening on port', PORT)) );
