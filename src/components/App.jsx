import React from 'react';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';
import Vote from './Vote.jsx';
import Signup from './Signup.jsx';

const App = () => {
  return (
    <Router>
      <div>
        <p>Good-v-Bad: The Game</p>
        <div>
          <div><Link to='/signup'>Signup</Link></div>
          <div><Link to='/vote'>Vote</Link></div>
        </div>
        <hr/>
        <Route path='/signup' component={Signup}/>
        <Route path='/vote' component={Vote}/>
      </div>
    </Router>
  );
};

export default App;