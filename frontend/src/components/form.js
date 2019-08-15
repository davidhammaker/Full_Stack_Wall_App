import React from 'react';
import PostForm from './postform';


// Render a the PostForm only if a token exists
function Form(props) {
  var form = <></>
  if (props.token) {
    form = <PostForm username={ props.username } token={ props.token } />
  }
  return form
}

export default Form;