'use strict';

const express = require('express');
const socket = require('socket.io');

module.exports = function(app, express, server) {

  // let server = require('http').createServer(app);
  let io = require('socket.io')(server);

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


  //send each client an id
  socket.emit('setPlayerID', socket.client.id);


  //getPlayerAmount
  socket.on('gameStart', () => {
    //if there are 5 players invoke setCoin
    if (userArray.length === 5) {
      console.log('starting game');
      setCoin();
    } else {
      console.log('not enought players yet!');
    }
  });

  //give player picker status
  let setCoin = () => {
    userArray[coinCounter % userArray.length].picker = true;

    socket.emit('setPicker', ({ picker: userArray[coinCounter % userArray.length].userID, array: userArray }));
    socket.broadcast.emit('setPicker', ({ picker: userArray[coinCounter % userArray.length].userID, array: userArray }));

    coinCounter++;

  };

//picker selects which user to add to the group
  socket.on('selectUser', (picked) => {
    console.log('in selectUser');
    userArray.forEach((el) => {
      if (el.userID === picked) {
        if (selectCounter < 3) {
          if (el.selected === false) {
            selectCounter++;
            el.selected = true;
          } else {
            selectCounter--;
            el.selected = false;
          }
          
          updateClientArray();

          if (selectCounter === 3) {
            startGroupVote();
          }
        } else {
          socket.emit('error', 'you selected too many! Deselect one');          
        }
      }
    });
  });

  let updateClientArray = () => {
    console.log('in updateClientArray ', userArray);

    socket.broadcast.emit('updateArray', userArray);
    socket.emit('updateArray', userArray);

  };


  //resets each players roundVote missionVote picker selected 
  let cleanPlayers = () => {
    console.log('scrub that dirty player down');
    userArray.forEach((el, i) => {
      el.missionVote = null;
      el.roundVote = null;
      el.picker = false;
      el.selected = false;
    });
  };

  let addToCounter = function () {
    roundCounter += 1;
    if (roundCounter === userArray.length) {
      console.log('all are counted');
      //invoke countMajorityVote
      countMajorityVote();
    }
  };

  let startGroupVote = () => {
    console.log('Start Voting Now:');
    //send that user vote box component
    socket.broadcast.emit('voteBoxes', true);
    socket.emit('voteBoxes', true);
  };

  //sets player vote to pass or fail
  socket.on('roundVote', (voteObj) => {
    // console.log('in the roundVote on server', voteObj.user + ' ' + voteObj.vote);
    console.log(voteObj);

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
  let countMajorityVote = () => {
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

    //if group vote fails
    if (falseCount > trueCount) {
      //run groupVoteFailed
      groupVoteFailed();
    }

    console.log('false ' + falseCount + ', true ' + trueCount);
    console.log(trueCount > falseCount ? 'vote passes' : 'vote fails');
    return trueCount > falseCount ? 'vote passes' : 'vote fails';
  };

  let groupVoteFailed = () => {
    //we want to clean the players
    cleanPlayers();    

    socket.broadcast.emit('setPicker', '');
    socket.emit('setPicker', '');

    socket.broadcast.emit('voteBoxes', false);
    socket.emit('voteBoxes', false);
    
    updateClientArray();  
        
    setCoin();
    //and set the next user to as the picker

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

};