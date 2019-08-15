import React from 'react';
import LoginForm from './loginform';


// Render the LoginForm with appropriate surroundings.
function Login(props) {
  return (
    <div>
      <div className="btn-group float-right bg-dark mr-2 rounded sm">
        <a className="text-light text-decoration-none" href="/">
          <button className="btn btn-dark">
            Home
          </button>
        </a>
      </div>
      <h1 className="p-4 border border-left-0 border-top-0 border-right-0">Log In</h1>
      <LoginForm />
    </div>
  )
}

export default Login;
