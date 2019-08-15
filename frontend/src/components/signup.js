import React from 'react';
import SignUpForm from './signupform';


// Render the SignUpForm with appropriate surroundings.
function SignUp(props) {
  return (
    <div>
      <div className="btn-group float-right bg-dark mr-2 rounded sm">
        <a className="text-light text-decoration-none" href="/">
          <button className="btn btn-dark">
            Home
          </button>
        </a>
      </div>
      <h1 className="p-4 border border-left-0 border-top-0 border-right-0">
        Sign Up
      </h1>
      <SignUpForm />
    </div>
  )
}

export default SignUp;
