import React from 'react';
import axios from 'axios';
import { getCookie } from './utils/cookiefunctions';


var csrftoken = getCookie('csrftoken');


class SignUpForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
      errors: []
    }

    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleConfirmPasswordChange = this.handleConfirmPasswordChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleUsernameChange(e) {
    this.setState({username: e.target.value})
  }

  handleEmailChange(e) {
    this.setState({email: e.target.value})
  }

  handlePasswordChange(e) {
    this.setState({password: e.target.value})
  }

  handleConfirmPasswordChange(e) {
    this.setState({confirmPassword: e.target.value})
  }


  handleSubmit(e) {
    let allErrors = [];
    let initialErrors = false;

    if (
      this.state.username === ''
      || this.state.email === ''
      || this.state.password === ''
      || this.state.confirmPassword === ''
      ) {
      allErrors.push('All fields are required.');
      this.setState((state) => ({
        errors: allErrors
      }));
      initialErrors = true;
      console.log('Missing field.');
    }
    if (this.state.password !== this.state.confirmPassword) {
      allErrors.push('Passwords must match.');
      this.setState((state) => ({
        errors: allErrors
      }));
      initialErrors = true;
      console.log('Passwords do not match.');
    }
    if (!initialErrors) {
      axios.post(
        'http://localhost:8000/user/create/',
        {
        username: this.state.username,
        email: this.state.email,
        password: this.state.password
        },
        {
          headers: {'X-CSRFToken': csrftoken}
        }
      )
      .then(
        (response) => {
          console.log(response);
          window.location.replace("/complete")
        }
      )
      .catch(
        (errors) => {
          if(errors) {
            console.log(errors);
            allErrors.push("An error occurred. It's likely that another user with that username and/or email address has already been registered.");
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
          <label>Email:</label>
          <input
            type="email"
            value={ this.state.value }
            onChange={ this.handleEmailChange }
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
        <div className="form-group">
          <label>Confirm Password:</label>
          <input
            type="password"
            value={ this.state.value }
            onChange={ this.handleConfirmPasswordChange }
            className="form-control" />
        </div>
        <input type="submit" value="Submit" className="btn btn-info mt-2" />
      </form>
    )
  }
}


function SignUp(props) {
  return (
    <div>
      <a className="btn btn-dark float-right mt-4 mr-4" href="/">Home</a>
      <h1 className="p-4 border border-left-0 border-top-0 border-right-0">Sign Up</h1>
      <SignUpForm />
    </div>
  )
}

export default SignUp;
