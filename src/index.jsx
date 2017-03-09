import React from 'react';
import ReactDOM from 'react-dom';
import Signup from './components/Signup.jsx';

class Index extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
       <Signup />
      </div>
    );
  }
}

ReactDOM.render(<Index/>, document.getElementById('root'));




