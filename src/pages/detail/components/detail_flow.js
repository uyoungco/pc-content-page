import React, { PureComponent } from 'react'
import { connect } from 'react-redux'

import InfiniteScroll from 'react-infinite-scroller'

import { actionCreators } from '../store'
import '../style.less'

// 三图传入 data
const ThreePicture = props => (
  <div className="newslist newsitem">
    <div className="content">
      <h1><a href="/" >{props.data.get('title')}</a></h1>
      <p className="pic3">
        <a href="/" className="hover-scale">
          <img src={props.data.get('titlepic')} alt="" />
        </a>
        <a href="/" className="hover-scale">
          <img src={props.data.get('titlepic2')} alt="" />
        </a>
        <a href="/" className="hover-scale">
          <img  src={props.data.get('titlepic3')} alt="" />
        </a>
      </p>
      <p className="info">
        <span className="newstag" style={{color: '#68a285'}}>{props.data.get('classname')}</span> {/* 栏目 */}
        <span><a href="/" className="cmt-num">{props.data.get('befrom')}</a></span> {/* 来源 */}
        <span className="render-time">{props.data.get('newstime')}</span> {/* 时间 */}
      </p>
      <div className="operate">
        <a onClick={() => props.handelItemDetele(props.index)} className="del"><span>不感兴趣</span></a>
      </div>
    </div>
  </div>
)

// 单图
const OnePicture = props => (
  <div className="newslist newsitem oneimg">
    <p className="hover-scale pic">
      <a href="/"><img src={props.data.get('titlepic')} alt=""/></a>
    </p>
    <div className="content">
      <h1><a href="/">{props.data.get('title')}</a></h1>
      <p className="info">
        <span className="newstag" style={{color: "#5996fd"}}>{props.data.get('classname')}</span>
        <span><a href="/" className="cmt-num">{props.data.get('befrom')}</a></span>
        <span className="render-time">{props.data.get('newstime')}</span>
      </p>
      <div className="operate">
        <a onClick={() => props.handelItemDetele(props.index)} className="del"><span>不感兴趣</span></a>
      </div>
    </div>
  </div>
)

// 大图广告
const MaxAds = props => (
  <div className="newsitem fourimgs allclk">
    <div className="content">
      <h1><a href="/">上海市辖区小两口下班没事在家赚钱，半年后存款惊人！</a></h1>
      <p className="pic4 bigpic">
        <a href="/" className="hover-scale"><img src="https://s3m.mediav.com/galileo/589147-b6f9dcf8aacb29628f0243e2d3bfe2f3.jpg" alt=""/></a>
      </p>
      <p className="info">
        <span className="newstag">广告</span>
        <span>摇钱树投资 · 顶新</span>
      </p>
      <div className="operate">
        <a href="/" className="del"><span>不感兴趣</span></a>
      </div>
    </div>
  </div>
)

class DetailFlow extends PureComponent {
  render() {

    let items = [];
    this.props.detailList.map((item, index) => {
      if (item.get('titlepic') && item.get('titlepic2') && item.get('titlepic3')) {
        items.push(
          <ThreePicture key={item.get('id')}  index={index} data={item} handelItemDetele={this.props.handelItemDetele}/>
        )
      } else if (item.get('titlepic') || item.get('titlepic2')) {
        items.push(
          <OnePicture key={item.get('id')} index={index}  data={item} handelItemDetele={this.props.handelItemDetele}/>
        )
      }
    })


    return (
      <div id="detail_flow" className="totop_fixed">
        <InfiniteScroll
          // initialLoad={false}
          useWindow={false}
          pageStart={0}
          loadMore={(page) => this.props.loadItems(page)}
          hasMore={this.props.hasMoreItems}
          loader={<div className="loader" key={0}>Loading ...</div>}
        >
          {items}
        </InfiniteScroll>
      </div>
    )
  }
}


const mapStart = state => {
  return {
    detailList: state.getIn(['detail', 'detailList']),
    hasMoreItems: state.getIn(['detail', 'hasMoreItems'])
  }
}

const mapDispatch = dispatch => {
  return {
    loadItems(page) {
      dispatch(actionCreators.getItemList(page))
    },
    handelItemDetele(index) {
      dispatch(actionCreators.deteleItemList(index))
    }
  }
}

export default connect(mapStart, mapDispatch)(DetailFlow);
