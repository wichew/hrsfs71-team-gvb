import React from 'react';
import { Link } from 'react-router-dom';

const Login = () => {
  return (
    <div>
      <h2>Login</h2>
      <div>username<input type='text'></input></div>
      <div>password<input type='text'></input></div>
      <Link to='/game/lobby'><button>Login</button></Link>
      <Link to='/signup'>Go to Sign-Up</Link>
    </div>
  );
};

export default Login;