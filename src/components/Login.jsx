import React from 'react';
import { HashRouter as Router, Link, Route, Redirect } from 'react-router-dom';
import SignUp from './Signup.jsx';
import GameLobby from './GameLobby.jsx';

//hard coded until auth is implemented
const loggedin = true;
const username = 'player1';

const Login = () => {
  return (
    <div>
      <div>username<input type='text'></input></div>
      <div>password<input type='text'></input></div>
      <Link to='/game/lobby' render={()=> {
        if (loggedin) {
          return <GameLobby user={username} />;
        }
      }}><button>Login</button></Link>
      <button><Link path='/signup' component={Signup}></Link>Sign-Up</button>
    </div>
  );
};

export default Login;