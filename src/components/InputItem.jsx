import React from 'react';

class InputItem extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        {/*{console.log('props in inputItem ', this.props)}*/}
        <input
          type='checkbox'
          checked={this.props.vote}
          onChange={() => { this.props.handleCheck(this.props.userID); }} />
      </div>
    );
  }

}

export default InputItem;