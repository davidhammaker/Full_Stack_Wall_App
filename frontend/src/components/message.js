import React from 'react';
import { getCookie, unsetCookie } from './utils/cookiefunctions';

class Message extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: getCookie('message')
    }
  }
  render() {
    if (this.state.message) {
      unsetCookie('message');
      return (
        <small><div className="alert alert-success">{ this.state.message }</div></small>
      )
    }
    return <></>
  }
}

export default Message;
