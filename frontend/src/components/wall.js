import React from 'react';
import axios from 'axios';
import { getCookie } from './utils/cookiefunctions';


var token = getCookie('token');


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
    var username = getCookie('username');
    return (
      <div>Welcome, {username}!</div>
    )
  }
  return (
    <div>Please log in to post on the wall.</div>
  )
}


function Wall(props) {
  return (
    <div>
      <div className="btn-group float-right bg-dark mr-2 rounded sm">
        <a className="text-light text-decoration-none" href="/login"><button className="btn btn-dark">Log In</button></a>
        <a className="text-light text-decoration-none" href="/signup"><button className="btn btn-dark">Sign Up</button></a>
      </div>
      <h1
        className="display-4 p-4 border border-left-0 border-top-0 border-right-0 clearfix">
          Wall&nbsp;App
      </h1>
      <Welcome />
      <ListedPosts />
    </div>
  )
}

export default Wall;
