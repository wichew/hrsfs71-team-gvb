import React from 'react';
import ReactDOM from 'react-dom';
import SocketIOClient from 'socket.io-client';

var socket = SocketIOClient('http://localhost:3000');

class Index extends React.Component {
  constructor(props) {
    super(props);
    // socket = SocketIOClient('http://localhost:3000');
    this.state = {
      isGoing: false,
    };
    socket.on('testCheck', ()=>{ console.log('we are over here'); this.handleCheck(); });
  }

  handleCheck() {      
    console.log('hi', this.state.isGoing);
    this.setState({
      isGoing: !this.state.isGoing
    });
  }



  render() {
    return (
      <div>
        <p> This is working</p>
        <button onClick={() => { socket.emit('channel-name', 'Hello world!'); }}>Emit Me</button>
        <input type='checkbox' checked={this.state.isGoing} onChange={() => { console.log(this.state.isGoing); socket.emit('checked'); this.handleCheck(); }}></input>
      </div>
    );
  }
}

ReactDOM.render(<Index />, document.getElementById('root'));




