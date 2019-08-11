import React from 'react';
import axios from 'axios';


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


function Wall(props) {
  return (
    <div>
      <a className="btn btn-dark float-right mt-4 mr-4" href="/signup">Sign Up</a>
      <h1 className="p-4">Placeholder</h1>
      <ListedPosts />
    </div>
  )
}

export default Wall;
