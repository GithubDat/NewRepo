import React, { Component } from 'react';
import './App.css';
import Selection from './containers/Selection';
import User from './containers/User';


class App extends Component {
  render() {
    return (
      <div className="App">
        <Selection />
        <hr />
        <br />
        <User />
      </div>
    );
  }
}

export default App;
