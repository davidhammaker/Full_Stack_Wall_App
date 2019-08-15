import React from 'react';
import axios from 'axios';
import { getCookie } from './utils/cookiefunctions';


var csrftoken = getCookie('csrftoken');


// Render a delete button
function Delete(props) {
  function deleteItem() {
    var delConf = window.confirm(`Are you sure you want to delete this post?\n(${props.post.content})`);
    if (delConf) {
      console.log(props.token);
      axios.delete(
        `http://localhost:8000/posts/${props.post.id}/`,
        {
          headers: {
            'X-CSRFToken': csrftoken,
            'Authorization': `Token ${props.token}`
          }
        }
      )
      .then(
        (response) => {
          console.log(response);
          window.location.replace("/");
        }
      )
    }
  }

  return (
    <button className="btn btn-sm btn-danger float-right" onClick={ deleteItem }>Delete</button>
  );
}

export default Delete;
