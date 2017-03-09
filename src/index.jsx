import React from 'react';
import ReactDOM from 'react-dom';

class Index extends React.Component {
  constructor(props) {
    super(props);

  }

  render() {
    return (
      <div>
       <p> This is working</p>
      </div>
    );
  }
}


ReactDOM.render(<Index/>, document.getElementById('root'));




