import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App.jsx';

var socket = SocketIOClient('http://localhost:3000');

class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isGoing: false,
      resultsArray: [],
      playerID: '',
      picker: ''
    };
    // socket.on('testCheck', (userArray) => { this.setState({ resultsArray: userArray }); console.log('we are over here', userArray); this.handleCheck(); });
    socket.on('playerJoined', (array) => { console.log('playerJoined ', array); this.setState({ resultsArray: array }); });    
    socket.on('upDateChecks', (array) => { console.log('upDateChecks ', array); this.setState({ resultsArray: array }); });
    socket.on('setPlayerID', (id) => { this.setState({playerID: id}); });
    socket.on('setPicker', (picker) => { console.log(picker); this.setState({picker: picker}); });
   
    this.handleCheck = this.handleCheck.bind(this);
    this.roundVote = this.roundVote.bind(this);
    this.isPicker = this.isPicker.bind(this);
  }
  
  handleCheck(userID) {
    console.log('handleCheck userID', userID);
    var otherArray = this.state.resultsArray.slice();
    otherArray.forEach((el, i) => {
      if (el.userID === userID) {
        otherArray[i].vote = !otherArray[i].vote;
      }
    });
    socket.emit('updateCheckArray', otherArray);
    this.setState({
      resultsArray: otherArray
    });
  }

  roundVote(voteObj) {
    console.log('in the roundVote on client', voteObj.user + ' ' + voteObj.vote);
    socket.emit('roundVote', (voteObj));    
  }

  showID() {
    console.log(this.state.playerID);
  }

  isPicker(picked) {
    console.log(this.state.resultsArray);
    console.log('picker', this.state.picker);
    console.log('picked', picked);
    console.log(this.state.playerID === this.state.picker);
    if (this.state.playerID === this.state.picker) {
      socket.emit('selectUser', picked);
    }
  }

  render() {
    return (
      <div>
        <Signup />
        <p> This is working</p>
        <button onClick={() => { socket.emit('cleanPlayers'); }}>clean players</button>
        <button onClick={() => { this.showID(); }}>show my id</button>
        <button onClick={() => { socket.emit('gameStart'); }}>start game</button>
        
        {this.state.resultsArray.map((userInput) => {
          return <InputItem isPicker={this.isPicker} roundVote={this.roundVote} vote={userInput.vote} handleCheck={this.handleCheck} key={userInput.key} userID={userInput.userID} />;
        }
        )}
      </div>
    );
  }
}

ReactDOM.render(<Index />, document.getElementById('root'));
