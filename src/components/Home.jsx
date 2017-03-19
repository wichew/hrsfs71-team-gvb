import React from 'react';
import { Link } from 'react-router-dom';
import CreateGame from './CreateGame.jsx';
import JoinGame from './JoinGame.jsx';

//hard coded until auth is implemented
// const loggedin = false;

const Home = () => {
  return (
    <div>
      <div><Link to='/creategame'>Create Game</Link></div>
      <div><Link to='/game'>Join Game</Link></div>
    </div>
  );
};

export default Home;