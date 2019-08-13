import React from 'react';


function SignUpComplete(props) {
  return (
    <div>
      <a className="btn btn-dark float-right mt-4 mr-4" href="/">Home</a>
      <h1 className="p-4 border border-left-0 border-top-0 border-right-0">Sign Up Complete!</h1>
      <div className="alert alert-success">You have successfully signed up! <a className="alert-link" href="/">Return Home.</a></div>
      <br />
    </div>
  )
}

export default SignUpComplete;
