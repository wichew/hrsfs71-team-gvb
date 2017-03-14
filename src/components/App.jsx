import React from 'react';
import Vote from './Vote.jsx';
import Signup from './Signup.jsx';

const App = () => {
  return (
    <div>
      <p>Good-v-Bad: The Game</p>
      <Signup />
      <Vote />
    </div>
  );
};

export default App;