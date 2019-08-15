import React from 'react';
import { getCookie, unsetCookie } from './utils/cookiefunctions';


var token = getCookie('token');


// Render 'Log In' and 'Sign Up' links only if a user is not logged in.
// Otherwise, render a button that will log out a user.
function Links(props) {
  if (token) {
    function logOut() {
      unsetCookie('username');
      unsetCookie('token');
      window.location.replace("/");
    }
    return (
      <>
        <button className="btn btn-dark" onClick={ logOut }>Log Out</button>
      </>
    )
  }
  return (
    <>
      <a className="text-light text-decoration-none" href="/login">
        <button className="btn btn-dark">Log In</button>
      </a>
      <a className="text-light text-decoration-none" href="/signup">
        <button className="btn btn-dark">Sign Up</button>
      </a>
    </>
  )
}

export default Links;
