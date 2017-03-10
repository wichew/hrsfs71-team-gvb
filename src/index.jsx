import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, browserHistory} from 'react-router';
import {App} from './components/App.jsx';

class Index extends React.Component {
  constructor(props) {
    super(props);

  }

  render() {
    return (
      <Router history={browserHistory}>
        <Route path={'app'} component = {App}/>
      </Router>
    );
  }
}


ReactDOM.render(<Index/>, document.getElementById('root'));




