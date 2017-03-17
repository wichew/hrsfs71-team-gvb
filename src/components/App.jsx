/*
This is both the entry point to the app and the route config
Login or signup
--> Create or Join

From Create
--> Game (Waiting Room)

From Join
--> Game (Waiting Room)

From Game (Waiting Room)
(this is where socket connection and other state is held)
--> Vote (for now, later, we'll have:
- BuildMissionTeam
- VoteOnSendingMission
- VoteOnMissionSuccess

From Vote (or maybe this is the same component)
--> VoteResults
*/

import React from 'react';
import { HashRouter as Router, Link, Route } from 'react-router-dom';
import { Redirect } from 'react-router';
// import Vote from './Vote.jsx';
import Signup from './Signup.jsx';
import Login from './Login.jsx';

const App = () => {
  return (
    <Router basename='/play'>
      <div>
        <p>Good-v-Bad: The Game</p>
        <div>
          <div><Link to='/signup'>Signup</Link></div>
          <div><Link to='/login'>Signup</Link></div>
          {/*<div><Link to='/vote'>Vote</Link></div>*/}
        </div>
        <hr/>
        <Route path='/signup' component={Signup}/>
        <Route path='/login' component={Login}/>
        {/*<Route path='/vote' component={Vote}/>*/}
      </div>
    </Router>
  );
};

export default App;