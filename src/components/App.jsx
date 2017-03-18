import React from 'react';
import { BrowserRouter as Router, Link, Route, Redirect } from 'react-router-dom';
import Signup from './Signup.jsx';
import Login from './Login.jsx';
import Home from './Home.jsx';
import GameLobby from './GameLobby.jsx';
import CreateGame from './CreateGame.jsx';
import JoinGame from './JoinGame.jsx';
import Game from './Game.jsx';

//hard coded until auth is implemented
const loggedin = false;
const username = 'player1';

const App = () => {
  return (
    <Router>
      <div>
        {/*<Route exact path='/' render={() => <Home /> } />*/}
        <Route exact path='/' render={() => {
          return loggedin ? <Redirect to='/home' /> : <Redirect to='/login' />;
        }}/>
        <Route path='/home' component={Home}/>
        <Route path='/login' component={Login}/>
        <Route path='/signup' component={Signup}/>
        <Route path='/creategame' render={() => <CreateGame user={username}/>}/>
        <Route path='/joingame' render={() => <JoinGame user={username}/>}/>
        <Route path='/game/lobby' render={() => {
          return (loggedin) ? <GameLobby user={username}/> : <Redirect to='/login'/>;
        }}/>
        <Route path='/game/vote' render={() => <Vote user={username}/>}/>
      <Game/>
      </div>
      
    </Router>
  );
};

export default App;