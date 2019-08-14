import React from 'react';
import axios from 'axios';
import { getCookie } from './utils/cookiefunctions';


var csrftoken = getCookie('csrftoken');


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
      console.log('Missing field.');
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
            console.log(errors);
            allErrors.push("An error occurred.");
            this.setState((state) => ({
              errors: allErrors
            }));
          }
        }
      );
      console.log('Post attempted.');
    }
    else {
      console.log('Post not attempted.');
    }
    console.log(this.state.errors.toString());
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


class Message extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: getCookie('message')
    }
  }


  render() {
    if (this.state.message) {
      document.cookie = 'message=; expires=Thu, 01 Jan 1970 00:00:00 UTC;';
      return (
        <small><div className="alert alert-success">{ this.state.message }</div></small>
      )
    }
    return <></>
  }
}


function Login(props) {
  return (
    <div>
      <div className="btn-group float-right bg-dark mr-2 rounded sm">
        <a className="text-light text-decoration-none" href="/"><button className="btn btn-dark">Home</button></a>
      </div>
      <h1 className="p-4 border border-left-0 border-top-0 border-right-0">Log In</h1>
      <LoginForm />
    </div>
  )
}

export default Login;
