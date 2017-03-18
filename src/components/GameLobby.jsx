import React from 'react';
import { Link, Route, Redirect } from 'react-router-dom';

// Not currently in use
class GameLobby extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
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