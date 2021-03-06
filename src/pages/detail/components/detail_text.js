import React from 'react'
import { Spin } from 'antd';
import { connect } from 'react-redux'

import PaginAtion from './paginAtion'
import BaiduAds from '../ADS/baiduAds_test'

const DetailText = props => {
  const { title, befrom, newstime, articleContent, page, totalPage } = props
  const newContent = articleContent.toJS()

  return (
    <div>
      <Spin spinning={props.loading} tip="努力加载中...">
        <h1 id="bd_article_title">{title}</h1>
        <p className="article-info">
          <span className="source">{befrom}</span>
          <span className="bd_article_time">{newstime}</span>
        </p>
          <div className="content" dangerouslySetInnerHTML={{__html: newContent[page]}}></div>
      </Spin>
      <div>
        <BaiduAds
          id="u3157509"
        ></BaiduAds>


      </div>
      { totalPage > 1 ? <PaginAtion /> : null }
    </div>
  )
}


const mapState = state => ({
  loading: state.getIn(['detail', 'loading']),
  page: state.getIn(['detail', 'page']),
  totalPage: state.getIn(['detail', 'totalPage']),
  title: state.getIn(['detail', 'title']),
  befrom: state.getIn(['detail', 'befrom']),
  newstime: state.getIn(['detail', 'newstime']),
  articleContent: state.getIn(['detail', 'articleContent'])
})

export default connect(mapState, null)(DetailText)
