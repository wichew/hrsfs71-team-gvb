/*import React from 'react';
import { Link } from 'react-router-dom';
import SocketIOClient from 'socket.io-client';
import Player from './Player.jsx';
import Game from './Game.jsx';

const socket = SocketIOClient('http://localhost:3000');
const MIN_PLAYERS = 5;

class GameLobby extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      resultsArray: []
    };
    socket.on('updateArray', (array) => { this.setState({ resultsArray: array }); console.log('Array Updated To:', this.state.resultsArray); });
  }

  render () {
    if (this.state.resultsArray.length >= MIN_PLAYERS) {
      return (
        <div>
          <Game socket={socket} />
        </div>
      );
    } else {
      return (
          <div>
            <div>Waiting for all players to join . . .</div>
            { this.state.resultsArray.map((player, i) => <Player key={i} playerStats={player} />) }
          </div>
      );
    }
  }  
}

export default GameLobby;*/