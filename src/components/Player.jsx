import React from 'react';

class Player extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <div style={{ display: 'flex', flexDirection: 'row', flex: 7, border: '2px solid grey', borderRadius: 6, padding: 6, margin: 6, backgroundColor: this.props.selected ? 'lightblue' : 'white' }}>
          <div style={{ flex: .5 }}><img src='https://api.adorable.io/avatars/120/cat%40adorable.io' style={{ borderBottomLeftRadius: 100, borderBottomRightRadius: 100, borderTopLeftRadius: 100, borderTopRightRadius: 100, width: '100%' }} /></div>
          <div style={{ flex: 1, alignContent: 'center', }} onClick={() => { this.props.isPicker(this.props.userID); }} style={{ paddingLeft: 10, flex: 8, alignSelf: 'center', alignContent: 'center' }} >
            <span style={{ fontSize: 20 }}>{this.props.userID} -- {this.props.username}</span>
          </div>
        </div>
        <div style={{ flex: 1 }}>
          <span style={{ paddingLeft: 10, flex: 8, alignSelf: 'center', alignContent: 'center', fontSize: 20 }} >{this.props.pickerID === this.props.userID ? 'picker' : ''}</span>
        </div>
      </div>
    );
  }

}

export default Player;