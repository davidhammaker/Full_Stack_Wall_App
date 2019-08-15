import React from 'react';
import axios from 'axios';
import Message from './message';
import { getCookie } from './utils/cookiefunctions';


var csrftoken = getCookie('csrftoken');


// Display a form that accepts username and password.
// On submission, store token contained in resulting response.
// Also display any relevant messages, such as a successful sign-up
// message.
class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      errors: []
    }

    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleUsernameChange(e) {
    this.setState({username: e.target.value})
  }

  handlePasswordChange(e) {
    this.setState({password: e.target.value})
  }


  handleSubmit(e) {
    let allErrors = [];
    let initialErrors = false;

    if (
      this.state.username === ''
      || this.state.password === ''
      ) {
      allErrors.push('All fields are required.');
      this.setState((state) => ({
        errors: allErrors
      }));
      initialErrors = true;
    }
    if (!initialErrors) {
      axios.post(
        'http://localhost:8000/api-token-auth/',
        {
        username: this.state.username,
        password: this.state.password
        },
        {
          headers: {'X-CSRFToken': csrftoken}
        }
      )
      .then(
        (response) => {
          var token = response.data['token'];
          document.cookie = `token=${token}`;
          document.cookie = `username=${this.state.username}`;
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
      <form onSubmit={ this.handleSubmit } className="p-4">
      <Message />
      <small>{ errorMessage }</small>
        <div className="form-group">
          <label>Username:</label>
          <input
            type="text"
            value={ this.state.value }
            onChange={ this.handleUsernameChange }
            className="form-control" />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            value={ this.state.value }
            onChange={ this.handlePasswordChange }
            className="form-control" />
        </div>
        <div className="d-flex justify-content-end">
          <input type="submit" value="Submit" className="btn btn-info mt-2" />
        </div>
      </form>
    )
  }
}

export default LoginForm;
