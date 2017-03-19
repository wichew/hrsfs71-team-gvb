import React from 'react';

class Player extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {       
    return (
      <div>        
        <div onClick={()=>{ this.props.isPicker(this.props.userID); }} style={{backgroundColor: this.props.selected ? 'lightblue' : 'white'}} >
          {this.props.userID}         {this.props.pickerID === this.props.userID ? 'picker' : '' }
          </div>                  
      </div>
    );
  }

}

export default Player;