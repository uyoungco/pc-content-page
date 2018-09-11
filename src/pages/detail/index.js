import React from 'react'

import DetailFlow from './components/detail_flow'
import Main from './components/main'

import './style.less'

class Detail extends React.Component {
  render() {
    return (
      <div id="body">
        <DetailFlow />
        <div className="fragment" />
        <Main />
      </div>
    )
  }
}

export default Detail
