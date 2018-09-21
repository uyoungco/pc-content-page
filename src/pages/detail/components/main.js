import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { Skeleton } from 'antd';
import Loadable from 'react-loadable';

import { actionCreators } from '../store'
import '../style.less'
// 广告模块
// import ContentTopAds from '../ADS/content_top_gg'
// import ContentBottonAds from '../ADS/content_bottom_gg'
// import DayHotNewsBottonAds from '../ADS/day_hot_news_botton_gg'

// 栏目模块
import DayHotNews from  './day-hot-news'
import WonderfulRecommend from './wonderful-recommend'
// import DetailText from './detail_text'


const LoadableDetailText = Loadable({
  loader: () => import('./detail_text'),
  loading() {
    return [
      <Skeleton key={1} active />,
      <Skeleton key={2} active />,
      <Skeleton key={3} active />
    ]
  },
});


class Main extends PureComponent {
  componentDidMount() {
    this.props.initDetailText()
  }
  render() {
    return (
      <div id="main">
        {/* <ContentTopAds /> 广告 文章内容头部 */}
        <div id="bd_article">
          <LoadableDetailText />
          {/* <ContentBottonAds />  广告 文章内容下 */}
          <DayHotNews
            title="24小时热文"
            data={this.props.hotnews}
          />
          {/* <DayHotNewsBottonAds /> 热文下广告  */}
          <WonderfulRecommend
            title="相关推荐"
            data={this.props.xgtj}
          />
          {/* <ContentBottonAds />  广告 页面最底部 */}
        </div>
      </div>
    )
  }
}

const mapState = state => ({
  hotnews: state.getIn(['detail', 'hotnews']),
  xgtj: state.getIn(['detail', 'xgtj'])
})
const mapDispatch = dispatch => ({
  initDetailText() {
    dispatch(actionCreators.handleGetDetailContent(1))
  }
})

export default connect(mapState, mapDispatch)(Main)
