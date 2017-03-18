import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

// NOTE: It is simpler to take care of login only in login page, so 
// for MVP, user is not logged in immediately upon signup. Must click
// on 'login' button. 

class Signup extends React.Component {
  constructor({pathname}) {
    super({pathname});
    this.state = {
      username: '',
      password: ''
    };
    this.updateState = this.updateState.bind(this);
    this.submit = this.submit.bind(this);
  }

  updateState (e) {
    console.log('updating field: ', e.target.name, 'with value', e.target.value);
    this.setState({[e.target.name]: e.target.value});
  } 

  submit () {
    console.log('sending post to server for ', this.state);
    axios.post('/db/users', this.state);
  }

  render () {
    return (
      <div>
        <div id = 'signupPage'>
          <p>{this.pathname}</p>
          <div>
            <span>Username</span>
            <input type='text' onChange={this.updateState} name='username' />
          </div>
          <div>
            <span>Password</span>
            <input type='text' onChange={this.updateState} name='password' />
          </div>
        </div>
        <div>
          <button onClick={this.submit}>Signup</button>
          <Link to='/login'><button>Login</button></Link>
        </div>
      </div>
    );
  }
}   

export default Signup;