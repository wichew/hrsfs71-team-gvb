import React from 'react';
import ReactDOM from 'react-dom';
import Signup from './components/Signup.jsx';
import SocketIOClient from 'socket.io-client';

var socket = SocketIOClient('http://localhost:3000');
class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isGoing: false,
      resultsArray: [{userID: 'jscha', vote: false, key: '2387dakjh'}]
    };
    socket.on('testCheck', (userArray) => { this.setState({ resultsArray: userArray }); console.log('we are over here', userArray); this.handleCheck(); });
  }

  handleCheck(userID) {
    console.log('userID', userID);    
    this.setState({
      isGoing: !this.state.isGoing

    });
  }



  render() {
    return (
      <div>
        <Signup />
        <p> This is working</p>
        <button onClick={() => { console.log(this.state); socket.emit('channel-name', 'Hello world!'); }}>Emit Me</button> 
         {/*{this.state.resultsArray}      */}
        {this.state.resultsArray.map((userInput) => {
          return <input type='checkbox' checked={userInput.vote} onChange={() => { socket.emit('checked'); this.handleCheck(this); }} />;
        }
        )}         
      </div>
    );
  }
}

ReactDOM.render(<Index />, document.getElementById('root'));
