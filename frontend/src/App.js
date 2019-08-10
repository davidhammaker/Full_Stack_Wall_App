import React from 'react';
import axios from 'axios';


function Post(props) {
  const post = props.post;
  return (
    <div className="p-2">
      <h5 className="h-100">{ post.creator }
        <small className="float-right font-italic small-font">
          { post.date_posted }
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
      const data = response.data;
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


function App() {
  return (
    <div className="col-sm-8 mx-auto text-light bg-secondary">
      <h1 className="p-4">Placeholder</h1>
      <ListedPosts />
    </div>
  );
}

export default App;
