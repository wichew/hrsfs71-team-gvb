import React from 'react';
import { Link, Route, Redirect } from 'react-router-dom';
import CreateGame from './CreateGame.jsx';
import JoinGame from './JoinGame.jsx';

//hard coded until auth is implemented
const loggedin = true;

const Home = () => {
  return (
    <div>
      <Link path='/creategame' component={CreateGame}>Create Game</Link>
      <Link path='/joingame' component={JoinGame}>Join Game</Link>
    </div>
  );
};

export default Home;