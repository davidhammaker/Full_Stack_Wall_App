import React from 'react';
import PostForm from './postform';
import { getCookie } from './utils/cookiefunctions';


var token = getCookie('token');
var username = getCookie('username');


// Render a the PostForm only if a token exists
function Form(props) {
  var form = <></>
  if (token) {
    form = <PostForm username={ username } token={ token } />
  }
  return form
}

export default Form;