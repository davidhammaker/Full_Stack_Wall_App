import React from 'react';
import axios from 'axios';
import { getCookie } from './utils/cookiefunctions';


var csrftoken = getCookie('csrftoken');


class PostForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      content: '',
      errors: []
    }

    this.handleContentChange = this.handleContentChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleContentChange(e) {
    this.setState({content: e.target.value})
  }


  handleSubmit(e) {
    let allErrors = [];
    let initialErrors = false;

    if (this.state.content === '') {
      allErrors.push("You can't post a blank message.");
      this.setState((state) => ({
        errors: allErrors
      }));
      initialErrors = true;
    }
    if (!initialErrors) {
      axios.post(
        'http://localhost:8000/',
        {
        token: this.props.username,
        content: this.state.content
        },
        {
          headers: {
            'X-CSRFToken': csrftoken,
            'Authorization': `Token ${this.props.token}`
          }
        }
      )
      .then(
        (response) => {
          window.location.replace("/");
        }
      )
      .catch(
        (errors) => {
          if(errors) {
            allErrors.push("An error occurred.");
            this.setState((state) => ({
              errors: allErrors
            }));
          }
        }
      );
    }
    e.preventDefault();
  }

  render() {
    const errors = this.state.errors;
    let errorMessage;

    if (errors.toString() !== '') {
      errorMessage = 
        <div className="alert alert-danger">
          { errors.map((error) => 
              <div key={ error } className="ml-2"><strong>{ error }</strong></div>
            )
          }
        </div>
    }

    return (
      <form onSubmit={ this.handleSubmit } className="pl-4 pr-4 pb-4">
      <small>{ errorMessage }</small>
        <div className="form-group">
          <label>New Post:</label>
          <input
            type="text"
            value={ this.state.value }
            onChange={ this.handleContentChange }
            className="form-control" />
        </div>
        <div className="d-flex justify-content-end">
          <input type="submit" value="Post" className="btn btn-info mt-2" />
        </div>
      </form>
    )
  }
}

export default PostForm;
