import React from 'react'

import DetailFlow from './components/detail_flow'
import Main from './components/main'

import './style.less'

class Home extends React.Component {
  render() {
    return (
      <div id="body">
        <DetailFlow>
        </DetailFlow>
        <div className="fragment"></div>
        <Main>
        </Main>
      </div>
    )
  }
}

export default Home
