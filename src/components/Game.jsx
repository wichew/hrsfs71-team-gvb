import React from 'react';
import SocketIOClient from 'socket.io-client';
import InputItem from './InputItem.jsx';

var socket = SocketIOClient('http://localhost:3000');

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      resultsArray: [],
      questArray: [],
      playerID: '',
      picker: '',
      voteBoxes: false,
      confirmGroupBtn: false,
      coinCounter: null
    };
    socket.on('setPlayerID', (id) => { this.setState({ playerID: id }); });
    socket.on('setPicker', (pickerObj) => { this.setState({ picker: pickerObj.picker }); });
    socket.on('updateQuest', (quests) => { this.setState({ questArray: quests }); });
    socket.on('confirmGroupBtn', (bool) => { this.setState({ confirmGroupBtn: bool }); console.log(this.state.confirmGroupBtn); });
    socket.on('updateCoinCounter', (coin) => { this.setState({ coinCounter: coin }); console.log('coin state ', this.state.coinCounter); });
    socket.on('updateArray', (array) => { this.setState({ resultsArray: array }); console.log('Array Updated To:', this.state.resultsArray); });
    socket.on('voteBoxes', (bool) => { this.setState({ voteBoxes: bool }); console.log('voteBoxes for' + ' ' + this.state.playerID + ' ' + this.state.voteBoxes); });
    socket.on('error', (errorMsg) => { console.log(errorMsg); });
    
    this.roundVote = this.roundVote.bind(this);
    this.isPicker = this.isPicker.bind(this);
    this.sendConfirmation = this.sendConfirmation.bind(this);
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

  scoreColor(sucess) {
    if (sucess === true) {
      return 'green';
    }
    if (sucess === false) {
      return 'red';
    }
    return 'white';    
  }

  sendConfirmation() {
    socket.emit('groupConfirmed');
  }

  render() {
    return (
      <div>
        <p><b>{this.state.playerID}</b></p>
        <button onClick={() => { this.showID(); }}>show my id</button>
        <button onClick={() => { console.log('starting game'); socket.emit('gameStart'); }}>start game</button>
        {this.state.confirmGroupBtn ? <div><button onClick={()=> { this.sendConfirmation(); }}>{'CONFIRM GROUP'}</button></div> : <div></div>}
        {this.state.voteBoxes ? <div>
          <button onClick={() => { this.roundVote({ user: this.state.playerID, vote: true }); }}>PASS</button>
          <button onClick={() => { this.roundVote({ user: this.state.playerID, vote: false }); }}>FAIL</button>
        </div>
          : <p>{'wait'}</p>}
        {this.state.resultsArray.map((userInput) => {
          return <InputItem selected={userInput.selected} isPicker={this.isPicker} roundVote={this.roundVote} vote={userInput.vote} handleCheck={this.handleCheck} key={userInput.key} userID={userInput.userID} pickerID={this.state.picker} />;
        }
        )}

        <div>
          <div>
            <p>vote round</p>
            {
              this.state.questArray.map((quest) => {
                return (<div key={quest.questNum - 1} style={{ backgroundColor: (this.state.coinCounter % this.state.resultsArray.length) === (quest.questNum) ? 'peru' : 'white' }}>{quest.questNum}</div>);
              })
            }
          </div>
          <div>
            <p>score</p>
            {
              this.state.questArray.map((quest) => {
                return (<div key={quest.questNum - 1} style={{ backgroundColor: this.scoreColor(quest.success) }}>{quest.numberOfPlayers}</div>);
              })
            }
          </div>
          
        </div>

      </div>
    );
  }
}

export default Game;