import React from 'react';
import Message  from './Message.jsx';

class ChatList extends React.Component{
  constructor(props) {
    super(props)
    this.state = {};
  }
  render() {
    console.log(this.props)
    return (
      <div>
        <strong>Messages:</strong>
        {this.props.messages.length ? this.props.messages.map((message)=> <Message message={message}/>) : null}
      </div>  
    )
  }
}

export default ChatList