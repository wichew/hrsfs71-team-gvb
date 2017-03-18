import React from 'react';
import SocketIOClient from 'socket.io-client';
import InputItem from './InputItem.jsx';

var socket = SocketIOClient('http://localhost:3000');


class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {      
      resultsArray: [],
      playerID: '',
      picker: '',
      voteBoxes: false
    };        
    socket.on('setPlayerID', (id) => { this.setState({ playerID: id }); });
    socket.on('setPicker', (pickerObj) => { this.setState({ picker: pickerObj.picker}); });
    socket.on('updateArray', (array) => { this.setState({ resultsArray: array }); console.log('Array Sent:', array); console.log('Array Updated To:', this.state.resultsArray); });
    socket.on('voteBoxes', (bool) =>{ this.setState({voteBoxes: bool}); });
    socket.on('error', (errorMsg)=>{ console.log(errorMsg); });

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
    console.log('authorized to select? ', this.state.playerID === this.state.picker);
    if (this.state.playerID === this.state.picker) {      
      console.log('picker', this.state.picker);
      console.log('picked', picked);
      socket.emit('selectUser', picked);
      console.log(this.state.resultsArray);
    }
  }

  render() {
    return (
      <div>                 
        <p><b>{this.state.playerID}</b></p>
        <button onClick={() => { socket.emit('cleanPlayers'); }}>clean players</button>        
        <button onClick={() => { this.showID(); }}>show my id</button>
        <button onClick={() => { console.log('starting game'); socket.emit('gameStart'); }}>start game</button>
        {this.state.voteBoxes ? <div>
           <button onClick={()=>{ this.roundVote({user: this.state.playerID, vote: true}); }}>PASS</button>
           <button onClick={()=>{ this.roundVote({user: this.state.playerID, vote: false}); }}>FAIL</button>
           </div>
        : <p>{'wait'}</p>}
        {this.state.resultsArray.map((userInput) => {
          return <InputItem selected={userInput.selected} isPicker={this.isPicker} roundVote={this.roundVote} vote={userInput.vote} handleCheck={this.handleCheck} key={userInput.key} userID={userInput.userID} pickerID={this.state.picker} />;
        }
        )}
      </div>
    );
  }
}

export default Game;