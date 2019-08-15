import React from 'react';
import { unsetCookie } from './utils/cookiefunctions';

class Message extends React.Component {
  constructor(props) {
    super(props);
    this.message = this.props.message
  }
  render() {
    if (this.message) {
      unsetCookie('message');
      return (
        <small><div className="alert alert-success">{ this.message }</div></small>
      )
    }
    return <></>
  }
}

export default Message;
