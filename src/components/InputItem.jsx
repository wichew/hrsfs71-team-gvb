import React from 'react';

class InputItem extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        {/*{console.log('props in inputItem ', this.props)}*/}
        <div onClick={()=>{ this.props.isPicker(this.props.userID); }}>{this.props.userID}</div>
        <button onClick={()=>{ this.props.roundVote({user: this.props.userID, vote: true}); }}>PASS</button>
        <button onClick={()=>{ this.props.roundVote({user: this.props.userID, vote: false}); }}>FAIL</button>
        <input
          type='checkbox'
          checked={this.props.vote}
          onChange={() => { this.props.handleCheck(this.props.userID); }} />
      </div>
    );
  }

}

export default InputItem;