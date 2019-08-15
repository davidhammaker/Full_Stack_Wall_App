import React from 'react';


// If a user is logged in, display a welcome message.
// Otherwise, ask the user to log in.
function Welcome(props) {
  if (props.token) {
    return (
      <div className="font-italic mb-2 d-flex justify-content-center">
        Welcome, {props.username}!
      </div>
    )
  }
  return (
    <div className="font-italic mb-2 d-flex justify-content-center">
      Please log in to post on the wall.
    </div>
  )
}

export default Welcome;
