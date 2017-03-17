import React from 'react';
import { Link, Route, Redirect } from 'react-router-dom';

const CreateGame = () => {
  return (
    <div>
      <div>TODO: Add inputs tags and buttons for game creation</div>
      <Link path='/game/lobby'>Play!</Link>
    </div>
  );
};

export default CreateGame;