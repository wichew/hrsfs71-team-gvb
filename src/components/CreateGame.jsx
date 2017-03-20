import React from 'react';
import { Link } from 'react-router-dom';

class CreateGame extends React.Component {
  constructor(props) {
    super(props)
  }

  render () {
    return (
      <div>
        <h3>Welcome to our game {this.props.user.username}!</h3>
        <div>TODO: Add inputs tags and buttons for game creation</div>
        <div>
        <button onClick = {this.props.decrementNumberOfPlayers}> - </button>{this.props.numberOfPlayers}<button onClick = {this.props.incrementNumberOfPlayers}> + </button>
        </div>

        <Link to='/game' user>Play!</Link>
      </div>
    );
  }
};

export default CreateGame;