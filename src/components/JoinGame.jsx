import React from 'react';
import { HashRouter as Router, Link, Route, Redirect } from 'react-router-dom';

const JoinGame = () => {
  return (
    <div>
      <div>TODO: Add dropdown to choose game to join</div>
      <Link path='/game/lobby'>Play!</Link>
    </div>
  );
};

export default JoinGame;