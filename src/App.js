import React, { Component } from 'react'
import { Provider } from 'react-redux'

import store from './store'
import './style.less'

import Header from './common/header'
import Detail from './pages/detail'

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <Header />
          <Detail />
        </div>
      </Provider>
    );
  }
}

export default App;
