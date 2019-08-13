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
          console.log(response.data['token']);
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
        <input type="submit" value="Submit" className="btn btn-info mt-2" />
      </form>
    )
  }
}





function Login(props) {
  return (
    <div>
      <a className="btn btn-dark float-right mt-4 mr-4" href="/">Home</a>
      <h1 className="p-4 border border-left-0 border-top-0 border-right-0">Log In</h1>
      <LoginForm />
    </div>
  )
}

export default Login;
