import React from 'react'
import { Spin } from 'antd';
import Loadable from 'react-loadable';

// import DetailFlow from './components/detail_flow'
// import Main from './components/main'

import './style.less'


const LoadableDetailFlow = Loadable({
  // loader: () => import('./'),
  loader: () => import('./components/detail_flow'),
  loading() {
    return <Spin size="large"></Spin>
    // return <div>正在加载</div>
  },
});

const LoadableMain = Loadable({
  // loader: () => import('./'),
  loader: () => import('./components/main'),
  loading() {
    return <Spin size="large"></Spin>
    // return <div>正在加载</div>
  },
});

class Detail extends React.Component {
  render() {
    return (
      <div id="body">
        <LoadableDetailFlow />
        <div className="fragment" />
        <LoadableMain />
      </div>
    )
  }
}

export default Detail
