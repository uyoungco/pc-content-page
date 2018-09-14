import React, { PureComponent } from 'react'
import { connect } from 'react-redux'


import { actionCreators } from '../store'
import '../style.less'
// 广告模块
import ContentTopAds from '../ADS/content_top_gg'
import ContentBottonAds from '../ADS/content_bottom_gg'
import DayHotNewsBottonAds from '../ADS/day_hot_news_botton_gg'

// 栏目模块
import DayHotNews from  './day-hot-news'
import WonderfulRecommend from './wonderful-recommend'
import DetailText from './detail_text'



class Main extends PureComponent {
  componentDidMount() {
    this.props.initDetailText()
  }
  render() {
    return (
      <div id="main">
        <ContentTopAds></ContentTopAds>
        <div id="bd_article">
          <DetailText />
          <ContentBottonAds />
          <DayHotNews
            title="24小时热文"
          />
          <DayHotNewsBottonAds />
          <WonderfulRecommend
            title="相关推荐"
          />
          <ContentBottonAds />
        </div>
      </div>
    )
  }
}

const mapDispatch = dispatch => ({
  initDetailText() {
    dispatch(actionCreators.handleGetDetailContent(1))
  }
})

export default connect(null, mapDispatch)(Main)
