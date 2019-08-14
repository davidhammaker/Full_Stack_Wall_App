import React from 'react';
import axios from 'axios';
import PostForm from './postform';
import { getCookie } from './utils/cookiefunctions';


var token = getCookie('token');
var username = getCookie('username');


function Post(props) {
  const post = props.post;

  let dateRaw = props.post.date_posted.toString();

  let year = dateRaw.slice(0, 4);
  let month = dateRaw.slice(5, 7);
  let day = dateRaw.slice(8, 10);
  let hourStr = dateRaw.slice(11, 13);
  let minute = dateRaw.slice(14, 16);

  let hourNum = parseInt(hourStr);
  let suffix = 'AM';
  if (hourNum > 12) {
    suffix = 'PM';
    hourNum -= 12;
  }
  let hour = hourNum.toString();
  
  const dateNew = `${hour}:${minute} ${suffix}, ${month}/${day}/${year}`

  return (
    <div className="p-2">
      <h5 className="h-100">{ post.creator }
        <small className="float-right font-italic small-font">
          { dateNew }
        </small>
      </h5>
      <p className="pl-2 large-font">{ post.content }</p>
    </div>
  );
}


class ListedPosts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {posts: []};
  }

  componentDidMount() {
    axios.get('http://localhost:8000')
    .then(response => {
      const data = response.data.results;
      const next = response.data.next;
      const previous = response.data.previous;
      this.setState({posts: data});
    })
    .catch(error => {
      console.log(error);
    })
  }

  render() {
    return (
      <div>
      { 
        this.state.posts.map((post) => 
        <Post key={ post.id } post={ post } />
        ) 
      }
      </div>
    )
  }
}


function Welcome(props) {
  if (token) {
    return (
      <div className="font-italic mb-2 d-flex justify-content-center">Welcome, {username}!</div>
    )
  }
  return (
    <div className="font-italic mb-2 d-flex justify-content-center">Please log in to post on the wall.</div>
  )
}


function Links(props) {
  if (token) {
    function logOut() {
      document.cookie = "username=; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
      document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
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
      <a className="text-light text-decoration-none" href="/login"><button className="btn btn-dark">Log In</button></a>
      <a className="text-light text-decoration-none" href="/signup"><button className="btn btn-dark">Sign Up</button></a>
    </>
  )
}


function Wall(props) {
  var form = <></>
  if (token) {
    form = <PostForm username={ username } token={ token } />
  }
  return (
    <div>
      <div className="btn-group float-right bg-dark mr-2 rounded sm">
        <Links />
      </div>
      <h1
        className="display-4 p-4 border border-left-0 border-top-0 border-right-0">
          Wall&nbsp;App
      </h1>
      <Welcome />
      { form }
      <ListedPosts />
    </div>
  )
}

export default Wall;
