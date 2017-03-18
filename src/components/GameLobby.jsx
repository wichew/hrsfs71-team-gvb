import React from 'react';
import { Link } from 'react-router-dom';
import SocketIOClient from 'socket.io-client';
import Player from './Player.jsx';

const socket = SocketIOClient('http://localhost:3000');
const MIN_PLAYERS = 5;

class GameLobby extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      players: []
    };
    socket.on('setPlayerID', (id) => { this.setState({ players: [...this.state.players, id] }); });
  }

  render () {
    if (players.length === MIN_PLAYERS) {
      return (
        <div>
          { this.state.players.map((player) => <div>{player}</div>) }
          <Link to='/game/vote'>Start</Link>
          <Route path='/game/vote' render={ ()=> <Game socket={socket} /> }/>
        </div>
      );
    } else {
      return (
        <div>
          <div>Waiting for all players to join . . .</div>
          { this.state.players.map((player) => <div>{player}</div>) }
        </div>
      );
    }
  }  
}

export default GameLobby;