import React from 'react';
import { HashRouter as Router, Link, Route, Redirect } from 'react-router-dom';
import Signup from './Signup.jsx';
import Login from './Login.jsx';
import Home from './Home.jsx';
import GameLobby from './GameLobby.jsx';
import CreateGame from './CreateGame.jsx';
import JoinGame from './JoinGame.jsx';
import Vote from './Vote.jsx';

//hard coded until auth is implemented
const loggedin = true;

const App = () => {
  return (
    <Router>
      <div>
        <Route exact path='/' render={() => {
          loggedin ? <Redirect to='/home' /> : <Redirect to='/login' />;
        }}/>
        <Route path='/home' component={Home}/>
        <Route path='/login' component={Login}/>
        <Route path='/signup' component={Signup}/>
        <Route path='/creategame' component={CreateGame}/>
        <Route path='/joingame' component={JoinGame}/>
        <Route path='/game/lobby' component={GameLobby}/>
        <Route path='/game/vote' component={Vote}/>
      </div>
    </Router>
  );
};

export default App;