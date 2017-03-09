import React from 'react';
import ReactDOM from 'react-dom';
import Signup from './components/Signup';

class Index extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
       <p> This is working</p>
       <Signup />
      </div>
    );
  }
}

ReactDOM.render(<Index/>, document.getElementById('root'));




