import React from 'react';

class InputItem extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <input type='checkbox' checked={userInput.vote} onChange={() => { socket.emit('checked'); this.handleCheck(this); }} />
    );
  }

}

export default InputItem;