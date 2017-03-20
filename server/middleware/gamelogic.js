const express = require('express');
const socket = require('socket.io');


module.exports = function (app, express, server) {

  // let server = require('http').createServer(app);
  let io = require('socket.io')(server);

  let userArray = [];
  let numberOfPlayersForTheGame = null;

  //create quest obj
  let quest = [[
    {
      questNum: 1,
      numberOfPlayers: 2,
      success: null,
    },
    {
      questNum: 2,
      numberOfPlayers: 3,
      success: null,
    },
    {
      questNum: 3,
      numberOfPlayers: 2,
      success: null,
    },
    {
      questNum: 4,
      numberOfPlayers: 3,
      success: null,
    },
    {
      questNum: 5,
      numberOfPlayers: 3,
      success: null,
    },
  ],
  [
    {
      questNum: 1,
      numberOfPlayers: 2,
      success: null,
    },
    {
      questNum: 2,
      numberOfPlayers: 3,
      success: null,
    },
    {
      questNum: 3,
      numberOfPlayers: 4,
      success: null,
    },
    {
      questNum: 4,
      numberOfPlayers: 3,
      success: null,
    },
    {
      questNum: 5,
      numberOfPlayers: 4,
      success: null,
    },
  ],
  [
    {
      questNum: 1,
      numberOfPlayers: 2,
      success: null,
    },
    {
      questNum: 2,
      numberOfPlayers: 3,
      success: null,
    },
    {
      questNum: 3,
      numberOfPlayers: 3,
      success: null,
    },
    {
      questNum: 4,
      numberOfPlayers: 4,
      needTwoToFail: true,
      success: null,
    },
    {
      questNum: 5,
      numberOfPlayers: 4,
      success: null,
    },
  ],
  [
    {
      questNum: 1,
      numberOfPlayers: 3,
      success: null,
    },
    {
      questNum: 2,
      numberOfPlayers: 4,
      success: null,
    },
    {
      questNum: 3,
      numberOfPlayers: 4,
      success: null,
    },
    {
      questNum: 4,
      numberOfPlayers: 5,
      needTwoToFail: true,
      success: null,
    },
    {
      questNum: 5,
      numberOfPlayers: 5,
      success: null,
    },
  ],
    [
    {
      questNum: 1,
      numberOfPlayers: 3,
      success: null,
    },
    {
      questNum: 2,
      numberOfPlayers: 4,
      success: null,
    },
    {
      questNum: 3,
      numberOfPlayers: 4,
      success: null,
    },
    {
      questNum: 4,
      numberOfPlayers: 5,
      needTwoToFail: true,
      success: null,
    },
    {
      questNum: 5,
      numberOfPlayers: 5,
      success: null,
    },
  ],
    [
    {
      questNum: 1,
      numberOfPlayers: 3,
      success: null,
    },
    {
      questNum: 2,
      numberOfPlayers: 4,
      success: null,
    },
    {
      questNum: 3,
      numberOfPlayers: 4,
      success: null,
    },
    {
      questNum: 4,
      numberOfPlayers: 5,
      needTwoToFail: true,
      success: null,
    },
    {
      questNum: 5,
      numberOfPlayers: 5,
      success: null,
    },
  ]
  ];

  let scoreCounter = 0;
  let roundCounter = 0;
  let missionCounter = 0;
  let coinCounter = 0;
  let selectCounter = 0;
  let questCounter = 0;

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
      inMission: false,
      key: socket.client.id
    });

    //send each client an id
    socket.emit('setPlayerID', socket.client.id);
    socket.emit('updatePlayerAmount', (numberOfPlayersForTheGame));


    //setUsername
    socket.on('updateUsername', (userObj) => {
      console.log('helllooo there!!!', userObj);
      userArray.forEach((player) => {
        if (player.userID === userObj.playerID) {
          player.name = userObj.username;
        }
      });
      updateClientArray();
    });

    //update the amount of players in the game
    socket.on('updatePlayerAmount', (newNumberOfPlayers) => {
      if(numberOfPlayersForTheGame === null) {
      numberOfPlayersForTheGame = newNumberOfPlayers;
      }
      io.emit('updatePlayerAmount',numberOfPlayersForTheGame)
    });

    //getPlayerAmount
    socket.on('gameStart', () => {
      //if there are the right amount of players invoke setCoin
      if (userArray.length === numberOfPlayersForTheGame) {
        cleanPlayers();
        io.emit('voteBoxes', false);        
        io.emit('updateQuest', quest[numberOfPlayersForTheGame-5]);
        setCoin();        
        updateClientArray();        
        console.log('starting game');
      } else {
        console.log('not enought players yet!');
      }
    });

    //give player picker status
    let setCoin = () => {
      let pickedUser = coinCounter % userArray.length;
      userArray[pickedUser].picker = true;
      io.emit('setPicker', ({ picker: userArray[pickedUser].userID }));
      coinCounter++;
      io.emit('updateCoinCounter', coinCounter);
      io.emit('updateQuest', quest[numberOfPlayersForTheGame-5]);
      io.emit('topMessage', userArray[pickedUser].userID + ' is picking ' + quest[numberOfPlayersForTheGame-5][questCounter].numberOfPlayers + ' players to go on the mission');
    };

    //picker selects which user to add to the group
    socket.on('selectUser', (picked) => {
      userArray.forEach((player) => {
        if (player.userID === picked) {
          if (player.selected === false) {
            selectCounter++;
            player.selected = true;
          } else {
            selectCounter--;
            player.selected = false;
          }
          updateClientArray();
          displaySelected();
          if (selectCounter === quest[numberOfPlayersForTheGame-5][questCounter].numberOfPlayers) {
            //send confirm button
            socket.emit('confirmGroupBtn', true);
          } else {
            socket.emit('confirmGroupBtn', false);
          }
        }
      });
    });

    let displaySelected = () => {
      let playerList = '';
      userArray.forEach((player) => {
        if (player.selected === true) {
          playerList += player.userID + ' ';
        }
      });
      io.emit('midMessage', playerList);
    };

    socket.on('groupConfirmed', () => {
      console.log('in groupConfirmed');
      socket.emit('confirmGroupBtn', false);
      io.emit('setPicker', '');
      startGroupVote();
    });

    let updateClientArray = () => {
      io.emit('updateArray', userArray);
    };

    //resets each players roundVote missionVote picker selected 
    let cleanPlayers = () => {
      console.log('scrub that dirty player down');
      userArray.forEach((player) => {
        player.missionVote = null;
        player.roundVote = null;
        player.picker = false;
        player.selected = false;
        player.inMission = false;
      });
      console.log('all cleaned');
    };

    let addToCounter = function () {
      roundCounter += 1;
      console.log('Added to roundCounter ', roundCounter);
    };

    let addToMission = function () {
      missionCounter += 1;
      console.log('Added to missionCounter ', missionCounter);
    };

    let startGroupVote = () => {
      console.log('Start voting now....');
      //send that user vote box component      
      io.emit('voteBoxes', true);
    };

    //sets player vote to pass or fail
    socket.on('roundVote', (voteObj) => {        
      userArray.forEach((player) => {
        if (player.userID === voteObj.user) {
          //if on mission vote
          if (player.inMission === true) {
            if (player.missionVote === null) {
              addToMission();
            }
            if (voteObj.vote === true) {
              player.missionVote = true;
            } else {
              player.missionVote = false;
            }
            updateClientArray();
            if (missionCounter === quest[numberOfPlayersForTheGame-5][questCounter].numberOfPlayers) {
              console.log('all are counted');
              countMissionVotes();
            }
          } else {
            //keeps track of how many players have voted
            if (player.roundVote === null) {
              addToCounter();
            }
            if (voteObj.vote === true) {
              // console.log('we got here insite the vote change');
              player.roundVote = true;
              // console.log('after the change', userArray);
            } else {
              player.roundVote = false;
            }
            updateClientArray();
            if (roundCounter === userArray.length) {
              console.log('all are counted');
              io.emit('resetroundVoteBtn');
              countMajorityVote();
            }
          }
        }
      });
    });

    //send all to users // try using for: 'everyone'
    updateClientArray();

    //counts all mission votes and finds majority
    let countMissionVotes = () => {
      console.log('inside countMissionVotes func!');
      var trueCount = 0;
      var falseCount = 0;
      userArray.forEach(player => {
        if (player.missionVote === true) {
          trueCount++;
        } else if (player.missionVote === false) {
          falseCount++;
        }
      });
      if (falseCount > 0) {
        console.log('the mission failed!');
        quest[numberOfPlayersForTheGame-5][questCounter].success = false;
      } else {
        console.log('the mission succeeded!');
        quest[numberOfPlayersForTheGame-5][questCounter].success = true;
      }
      //you should call this something else
      questCounter++;
      groupVoteFailed();
    };

    //counts all round votes and finds majority
    let countMajorityVote = () => {
      console.log('we got inside the countMajorityVote func!');
      var trueCount = 0;
      var falseCount = 0;
      for (var i = 0; i < userArray.length; i++) {
        if (userArray[i].roundVote === true) {
          trueCount++;
        } else if (userArray[i].roundVote === false) {
          falseCount++;
        }
      }
      //show who voted what
      updateClientArray();
      io.emit('showVotes', true);
      console.log('false ' + falseCount + ', true ' + trueCount);
      console.log(trueCount > falseCount ? 'vote passes' : 'vote fails')
      //if group vote fails
      if (falseCount > trueCount) {
        groupVoteFailed();
      } else {
        groupVoteSucceeded();
      }
    };

    let groupVoteSucceeded = () => {
      io.emit('voteBoxes', false);
      updateClientArray();
      io.emit('topMessage', 'Vote Success');
      io.emit('midMessage', '');
      setTimeout(()=>{ 
        io.emit('groupVoteBtns'); 
        missionVote(); 
        io.emit('showVotes', false); 
      }, 8000);
    };

    let groupVoteFailed = () => {
      //we want to clean the players
      io.emit('setPicker', '');
      io.emit('voteBoxes', false);
      selectCounter = 0;
      roundCounter = 0;
      missionCounter = 0;
      io.emit('topMessage', 'Vote Failed');
      io.emit('midMessage', '');      
      updateClientArray();
      setTimeout(()=>{
        cleanPlayers();
        io.emit('groupVoteBtns');
        setCoin();
        io.emit('showVotes', false);
        updateClientArray();        
      }, 8000);
    };

    let missionVote = () => {
      //get the players that are selected
      userArray.forEach((player) => {
        if (player.selected) {
          player.inMission = true;
          io.to(player.userID).emit('voteBoxes', true);
        }
      });
      updateClientArray();
    };

    //on leaving
    socket.on('disconnect', () => {
      for (var i = 0; i < userArray.length; i++) {
        if (userArray[i].userID === socket.client.id) {
          userArray.splice(i, 1);
          break;
        }
      }
      updateClientArray();
      console.log('user disconnected');
    });
  })
};