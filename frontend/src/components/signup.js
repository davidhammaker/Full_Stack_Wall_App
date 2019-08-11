import React from 'react';
import axios from 'axios';


function getCookie(name) {
  var cookieValue = null;
  if (document.cookie && document.cookie !== '') {
      var cookies = document.cookie.split(';');
      for (var i = 0; i < cookies.length; i++) {
          var cookie = cookies[i].trim();
          // Does this cookie string begin with the name we want?
          if (cookie.substring(0, name.length + 1) === (name + '=')) {
              cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
              break;
          }
      }
  }
  return cookieValue;
}
var csrftoken = getCookie('csrftoken');


class SignUpForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      email: '',
      password: '',
      confirmPassword: ''
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
    );
    e.preventDefault();
  }

  render() {
    return (
      <form onSubmit={ this.handleSubmit }>
        <label>
          Username:
          <input type="text" value={ this.state.value } onChange={ this.handleUsernameChange } />
        </label>
        <label>
          Email:
          <input type="email" value={ this.state.value } onChange={ this.handleEmailChange } />
        </label>
        <label>
          Password:
          <input type="password" value={ this.state.value } onChange={ this.handlePasswordChange } />
        </label>
        <label>
          Confirm Password:
          <input type="password" value={ this.state.value } onChange={ this.handleConfirmPasswordChange } />
        </label>
        <input type="submit" value="Submit" />
      </form>
    )
  }
}


function SignUp(props) {
  return (
    <div>
      <a className="btn btn-dark float-right mt-4 mr-4" href="/">Home</a>
      <h1 className="p-4">Sign Up</h1>
      <SignUpForm />
    </div>
  )
}

export default SignUp;
