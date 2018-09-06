import React, { Component } from 'react'

import './style.less'

import Header from './common/header'
import Home from './pages/home'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <Home />
      </div>
    );
  }
}

export default App;
