import React from 'react';
import { Link, Route, Redirect } from 'react-router-dom';

// will need api call in here to sign the user up
// simpler to take care of login only in login page, so 
// user is not logged in immediately upon signup. 
class Signup extends React.Component {
  constructor({pathname}) {
    super({pathname});
  }
  render () {
    return (
      <div>
        <div id = 'signupPage'>
          <p>{this.pathname}</p>
          <input type='text' id='firstName' placeholder='First Name' />
          <input type='text' id='lastName' placeholder='Last Name' />
          <input type='text' id='email' placeholder='Email Address' />
        </div>
        <div>
          <button>Signup</button>
          <button><Link to='/login'>Login</Link></button>
        </div>
      </div>
    );
  }
}   

export default Signup;