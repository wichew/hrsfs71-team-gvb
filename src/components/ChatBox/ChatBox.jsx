import React from 'react';
import ChatList from './ChatList.jsx';

class ChatBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: 'UserName',
      messages: ['Testing'],
      message:''
    };
    this.updateText = this.updateText.bind(this);
    this.submitMessage = this.submitMessage.bind(this); 
    this.messages = this.state.messages;
  }

  updateText(e) {
    console.log(e);
    this.setState({
      message: e.target.value
    })
    // if(e.key === 'Enter') {
    //   this.submitMessage(e);
    // }
  }

  submitMessage(e) {    
    console.log('does this fire?')
    this.state.messages.push(this.state.message)
    this.setState({
      messages: this.state.messages,
      message: ''
    });
    console.log(this.state.message)
    e.preventDefault();
  } 

  render() {
    console.log(this.state.messages)
     console.log(this.state.message)
    return(
      <div>
        <form onSubmit = {this.submitMessage}>
        <input type = 'text' value={this.state.message} onChange = {this.updateText}/>
        <button type = 'submit'>Comment</button>
        </form>
        <ChatList messages = {this.messages}/>
      </div>
    ) 
  }
}

export default ChatBox