import React from 'react';
import axios from 'axios';
import ListedPosts from './listedposts';
import Welcome from './welcome';
import Form from './form';
import Links from './links';


// Render the Wall App where users may view listed posts,
// or post their own.
class Wall extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      pageUrl: 'http://localhost:8000',
      next: '',
      previous: '',
      buttons: <></>
    }
    
    this.getPosts = this.getPosts.bind(this);
    this.next = this.next.bind(this);
    this.previous = this.previous.bind(this);
    this.updateButtons = this.updateButtons.bind(this);
  }

  updateButtons() {
    var nextButton;
    var previousButton;
    if (this.state.next) {
      nextButton =
        <button
          className="btn btn-sm btn-info float-right"
          onClick={ this.next }>
            Next
        </button>
    } else {
      nextButton =
        <button
          className="btn btn-sm btn-dark float-right" disabled>
            Next
        </button>
    }
    if (this.state.previous) {
      previousButton =
        <button
          className="btn btn-sm btn-info"
          onClick={ this.previous }>
            Previous
        </button>
    } else {
      previousButton =
        <button
          className="btn btn-sm btn-dark" disabled>
            Previous
        </button>
    }
    this.setState({
      buttons: <>{ nextButton }{ previousButton }</>
    })
  }

  getPosts(url) {
    axios.get(url)
    .then(response => {
      const data = response.data.results;
      const nextPage = response.data.next;
      const previousPage = response.data.previous;
      this.setState({
        posts: data,
        next: nextPage,
        previous: previousPage
      });
      this.updateButtons();
    });
  }

  next() {
    const url = this.state.next;
    this.setState({
      pageUrl: this.state.next
    });
    this.getPosts(url);
  }

  previous() {
    const url = this.state.previous;
    this.setState({
      pageUrl: this.state.previous
    });
    this.getPosts(url);
  }

  componentDidMount() {
    const url = this.state.pageUrl;
    this.getPosts(url);
  }

  render () {
    return (
      <>
        <div className="btn-group float-right bg-dark mr-2 rounded sm">
          <Links />
        </div>
        <h1
          className="display-4 p-4 border border-left-0 border-top-0 border-right-0">
            Wall&nbsp;App
        </h1>
        <Welcome />
        <Form />
        <div>
          { this.state.buttons }
        </div>
        <ListedPosts posts={ this.state.posts } />
      </>
    )
  }
}

export default Wall;
