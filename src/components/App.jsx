import React from 'react';
import { HashRouter as Router, Link, Route, Redirect } from 'react-router-dom';
import Signup from './Signup.jsx';
import Login from './Login.jsx';
import Home from './Home.jsx';
import GameLobby from './GameLobby.jsx';
import CreateGame from './CreateGame.jsx';
import JoinGame from './JoinGame.jsx';
import Game from './Game.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        loggedin: true,
        username: 'Bob'
      },
      numberOfPlayers: 5
      }
    this.login = this.login.bind(this);
    this.logOut = this.logOut.bind(this);
    this.decrementNumberOfPlayers = this.decrementNumberOfPlayers.bind(this);
    this.incrementNumberOfPlayers = this.incrementNumberOfPlayers.bind(this);
  }

  login(userName) {
    this.setState({
      user: {
        loggedin: true,
        username: userName
      }
    });
  }

  logOut() {
    this.setState({
      user: {
        loggedin: false,
        username: ''
      }
    });
  }

  decrementNumberOfPlayers() {
    if(this.state.numberOfPlayers >5){
      let decNoP = this.state.numberOfPlayers-1
      this.setState ({
         numberOfPlayers: decNoP
      })
    } else {
      console.log('Minimum Amount of Players is 5')
    }
  }

  incrementNumberOfPlayers () {
    if(this.state.numberOfPlayers < 10) {
      let incNoP = this.state.numberOfPlayers+1
      this.setState({
        numberOfPlayers: incNoP
      })
    } else {
      console.log('Maximum Amount of Players is 10')
    }
  }

  render() {
    return (
      <Router>
        <div>
          <p>Welcome to our game {this.state.user.username}!</p>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/signup">Signip</Link></li>
            <li><button onClick={this.logOut}>Logout</button></li>
          </ul>

          <hr/>

          {/*<Route exact path='/' render={() => <Home /> } />*/}
          <Route exact path='/' render={() => {
            return this.state.user.loggedin ? <Redirect to='/home' /> : <Redirect to='/login' />;
          }}/>
          <Route path='/home' component={Home}/>
          <Route path='/login' render={() => <Login login={this.login}/>} />
          <Route path='/signup' component={Signup}/>
          <Route path='/creategame' render={() => <CreateGame user={this.state.user} decrementNumberOfPlayers = {this.decrementNumberOfPlayers} incrementNumberOfPlayers = {this.incrementNumberOfPlayers}
          numberOfPlayers = {this.state.numberOfPlayers}/>} />
          <Route path='/game' render={() => {
<<<<<<< HEAD
            return (this.state.user.loggedin) ? <Game username={this.state.user.username} /> : <Redirect to='/login'/>;
=======
            return (this.state.user.loggedin) ? <Game user={this.state.user.username} numberOfPlayers ={this.state.numberOfPlayers}/> : <Redirect to='/login'/>;
>>>>>>> Add more game arrays into gamelogic.js and implemented create game feature.
          }}/>
          <Route path='/game/vote' render={() => <Vote user={this.state.user.username}/>}/>          
        <Game username={this.state.user.username}/>
        </div>
        
      </Router>
    );
  }
}

export default App;