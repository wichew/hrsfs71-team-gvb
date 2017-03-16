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

let userArray = [];
//create quest obj
let quest = [
  {
    questNum: 1,
    numberOfPlayer: 2,
    success: null,
  },
  {
    questNum: 2,
    numberOfPlayer: 3,
    success: null,
  },
  {
    questNum: 3,
    numberOfPlayer: 2,
    success: null,
  },
  {
    questNum: 4,
    numberOfPlayer: 3,
    success: null,
  },
  {
    questNum: 5,
    numberOfPlayer: 3,
    success: null,
  },

];


let scoreCounter = 0;
let roundCounter = 0;
let questCounter = 0;
let coinCounter = 0;
let selectCounter = 0;

io.on('connection', (socket) => {
  console.log('a user connected');

  //creates user item and puts it in the array
  userArray.push({
    name: null,
    roundVote: null,
    missionVote: null,
    picker: false,
    selected: false,
    avatar: null,
    userID: socket.client.id,
    vote: false,
    key: socket.client.id
  });


  //getPlayerAmount
  socket.on('gameStart', () => {
    console.log('getReqPlayers', userArray.length);
    //if there are 5 players invoke setCoin
    if (userArray.length === 5) {
      console.log('starting game');
      setCoin();
    }
  });


  setCoin = () => {
    console.log('setCoin');
    userArray[coinCounter % userArray.length].picker = true;

    socket.emit('setPicker', (userArray[coinCounter % userArray.length].userID));
    socket.broadcast.emit('setPicker', (userArray[coinCounter % userArray.length].userID));

    console.log('didid we change it?', userArray[coinCounter % userArray.length].picker);
    coinCounter++;
    console.log('coinCounter ', coinCounter);

  };


  startGroupVote = () => {
    console.log('we are counting votes now');
  };

  socket.on('selectUser', (picked) => {
    userArray.forEach((el) => {
      if (el.userID === picked) {
        if (el.selected === false) {
          selectCounter++;
          el.selected = true;
        } else {
          selectCounter--;
          el.selected = false;
        }
      }
      console.log(selectCounter);
      if (selectCounter >= 3) {
        startGroupVote();
      }
    });
  });



  //send each client an id
  socket.emit('setPlayerID', socket.client.id);

  //resets each players roundVote missionVote picker selected 
  socket.on('cleanPlayers', () => {
    console.log('scrub that dirty player down');
    userArray.forEach((el, i) => {
      el.missionVote = null;
      el.roundVote = null;
      el.picker = false;
      el.selected = false;
    });
  });

  var addToCounter = function () {
    roundCounter += 1;
    if (roundCounter === userArray.length) {
      console.log('all are counted');
      //invoke countMajorityVote
      countMajorityVote();
    }
  };

  //sets player vote to pass or fail
  socket.on('roundVote', (voteObj) => {
    // console.log('in the roundVote on server', voteObj.user + ' ' + voteObj.vote);
    userArray.forEach((el, i) => {
      if (el.userID === voteObj.user) {

        //keeps track of how many players have voted
        if (el.roundVote === null) {
          addToCounter();
        }
        // console.log('we found a match');
        if (voteObj.vote === true) {
          // console.log('we got here insite the vote change');
          el.roundVote = true;
          // console.log('after the change', userArray);
        } else {
          el.roundVote = false;
        }

        socket.broadcast.emit('playerJoined', userArray);
        socket.emit('playerJoined', userArray);

        // console.log('vote has changed to ' + el.roundVote + ' ' + el.userID);
        //update the roundCounter      
      }
    });
  });

  //send all to users // try using for: 'everyone'
  socket.broadcast.emit('playerJoined', userArray);
  socket.emit('playerJoined', userArray);


  //updates the array
  socket.on('updateCheckArray', (array) => {
    console.log('updateCheckArray', array);
    userArray = array;
    socket.broadcast.emit('upDateChecks', array);
    socket.emit('upDateChecks', array);
  });




  //counts all votes and finds majority
  countMajorityVote = () => {
    console.log('we got inside the countMajorityVote func!');
    var trueCount = 0;
    var falseCount = 0;
    for (var i = 0; i < userArray.length; i++) {
      if (userArray[i].roundVote === true) {
        trueCount++;
      } else {
        falseCount++;
      }
    }
    console.log('false ' + falseCount + 'true ' + trueCount);
    console.log(trueCount > falseCount ? 'vote passes' : 'vote fails');
    return trueCount > falseCount ? 'vote passes' : 'vote fails';
  };


  //on leaving
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


server.listen(PORT, () => (console.log('we are listening on port', PORT)));