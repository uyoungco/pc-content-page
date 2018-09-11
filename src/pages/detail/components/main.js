import React from 'react'

import '../style.less'
// 广告模块
import ContentTopAds from '../ADS/content_top_gg'
import ContentBottonAds from '../ADS/content_bottom_gg'
import DayHotNewsBottonAds from '../ADS/day_hot_news_botton_gg'

// 栏目模块
import DayHotNews from  './day-hot-news'
import WonderfulRecommend from './wonderful-recommend'

class Main extends React.Component {
  render() {
    return (
      <div id="main">
        <ContentTopAds></ContentTopAds>
        <div id="bd_article">
          <h1 id="bd_article_title">中国最来之不易的一个省，砸锅卖铁7年打回来，今现7000万吨宝藏</h1>
          <p className="article-info">
            <span className="source">用户1914631529</span>
            <span className="bd_article_time">时间</span>
          </p>
          {/* <Content dangerouslySetInnerHTML={{__html: this.props.content}} /> */}
          <div className="content">
            <p>内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容</p>
            <p>内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容</p>
            <img src="http://imgcdn.toutiaoyule.com/img/20180906/crpimg20180906100513274182.png" alt=""/>
            <p>内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容</p>
            <img src="http://imgcdn.toutiaoyule.com/img/20180906/crpimg20180906100513274182.png" alt=""/>
            <p>内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容</p>
            <p>内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容</p>
            <p>
              <img src="http://imgcdn.toutiaoyule.com/img/20180906/crpimg20180906100513274182.png" alt=""/>
            </p>
          </div>
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

export default Main
