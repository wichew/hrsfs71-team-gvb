import React from 'react';
import { Link, Route, Redirect } from 'react-router-dom';

class GameLobby extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isGoing: false,
      resultsArray: [],
      username: props.user,
      playerID: '',
      picker: '',
      voteBoxes: false
    };
  }

  render () {
    return (
        <div>
          <Link to='/game/vote'>Force Start</Link>
        </div>
    );
  }  
}

export default GameLobby;