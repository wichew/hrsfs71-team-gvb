import React from 'react'

class Signup extends React.Component {
  render () {
    return (
      <div>
        <div id = 'signupPage'>
          <input type='text' id='firstName' placeholder='First Name'>
          <input type='text' id='lastName' placeholder='Last Name'>
          <input type='text' id='email' placeholder='Email Address'>
        </div>
        <div id = 'buttons'>
          <p id='signupButton'>Sign Up</p>
          <p id='loginButton'> Login </p>
        </div>
      </div>
    )
  }
}

export default Signup