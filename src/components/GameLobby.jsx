import React from 'react';
import Player from './Player.jsx';

/*class GameLobby extends React.Component {
  constructor({gameState}) {
    super({gameState});
    this.state = gameState;
  }

  render () {
    console.log('state in gamelobby: ', this.state.resultsArray);
    return (
      <div>
        <div>Waiting for all players to join . . .</div>
          { this.state.resultsArray.map((player, i) => {
            return <Player selected={player.selected} isPicker={this.isPicker} roundVote={this.roundVote} vote={player.vote} handleCheck={this.handleCheck} key={player.key} userID=  {player.userID} pickerID={this.state.picker} />;
          })}
      </div>
    );
  }  
}

export default GameLobby;*/