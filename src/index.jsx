import React from 'react';
import ReactDOM from 'react-dom';
import Signup from './components/Signup.jsx';
import Game from './components/Game.jsx';

class Index extends React.Component {
  constructor(props) {
    super(props);    
  }
  render() {
    return (
      <div>
        <Signup />
        <Game />
      </div>
    );
  }
}

ReactDOM.render(<Index />, document.getElementById('root'));
