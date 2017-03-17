import React from 'react';
import { Link, Route, Redirect } from 'react-router-dom';

const Login = () => {
  return (
    <div>
      <div>username<input type='text'></input></div>
      <div>password<input type='text'></input></div>
      <Link to='/game/lobby'><button>Login</button></Link>
      <button><Link to='/signup'></Link>Sign-Up</button>
    </div>
  );
};

export default Login;