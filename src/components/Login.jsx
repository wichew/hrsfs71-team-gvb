import React from 'react';
import { Link, Route, Redirect } from 'react-router-dom';

const Login = () => {
  return (
    <div>
      <div>username<input type='text'></input></div>
      <div>password<input type='text'></input></div>
      <Link to='/game/lobby'><button>Login</button></Link>
      <Link to='/signup'><button>Sign-Up</button></Link>
    </div>
  );
};

export default Login;