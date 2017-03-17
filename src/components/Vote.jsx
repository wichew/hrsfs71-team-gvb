import React from 'react';
import ReactDOM from 'react-dom';
import SocketIOClient from 'socket.io-client';
import InputItem from './InputItem.jsx';

var socket = SocketIOClient('http://localhost:3000');

class Vote extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isGoing: false,
      resultsArray: []
    };
    socket.on('testCheck', (userArray) => { this.setState({ resultsArray: userArray }); console.log('we are over here', userArray); this.handleCheck(); });
    socket.on('playerJoined', (array)=> { console.log('playerJoined ', array); this.setState({ resultsArray: array }); });
    socket.on('upDateChecks', (array)=> { console.log('upDateChecks ', array); this.setState({ resultsArray: array }); });
    this.handleCheck = this.handleCheck.bind(this);
  }

  handleCheck(userID) {
    console.log('handleCheck userID', userID);
    var otherArray = this.state.resultsArray.slice();
    otherArray.forEach((el, i) => {
      if (el.userID === userID) {
        otherArray[i].vote = !otherArray[i].vote;
      }
    });
    console.log('size of array ', otherArray);
    socket.emit('updateCheckArray', otherArray);
    this.setState({
      resultsArray: otherArray
    });
  }

  render() {
    return (
      <div>
        <p>Vote</p>
        <button onClick={() => { console.log(this.state); socket.emit('channel-name', 'Hello world!'); }}>Emit Me</button>
        {/*return <input type='checkbox' checked={userInput.vote} onChange={() => { socket.emit('checked'); this.handleCheck(this.key); }} />;*/}
        {this.state.resultsArray.map((userInput) => {
          return <InputItem vote={userInput.vote} handleCheck={this.handleCheck} key={userInput.key} userID={userInput.userID} socket={socket} />;
        }
        )}
      </div>
    );
  }
}

export default Vote;