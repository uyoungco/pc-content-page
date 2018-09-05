import React, { Component } from 'react'
import NProgress from 'nprogress'
import './style.less'

import Header from './common/header'
import Home from './pages/home'

class App extends Component {
  render() {
    NProgress.start();
    return (
      <div className="App">
        <Header />
        <Home />
      </div>
    );
    NProgress.done();
  }
}

export default App;
