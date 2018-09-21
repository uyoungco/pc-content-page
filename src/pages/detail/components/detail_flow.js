import React from 'react'
import { connect  } from 'react-redux'
import { Spin } from 'antd';

import InfiniteScroll from 'react-infinite-scroller'

import { actionCreators } from '../store'
import '../style.less'

// 三图传入 data
const ThreePicture = props => {
  const id = props.data.get('id')
  const cateid = props.data.get('cateid')
  const url  = props.data.get('url')
  return (
    <div className="newslist newsitem">
      <div className="content">
        <h1><a onClick={() => props.getDetailContent(id, cateid, url)} >{props.data.get('title')}</a></h1>
        <p className="pic3">
          <a onClick={() => props.getDetailContent(id, cateid, url)} className="hover-scale" >
            <img src={props.data.get('titlepic')} alt="" />
          </a>
          <a onClick={() => props.getDetailContent(id, cateid, url)} className="hover-scale">
            <img src={props.data.get('titlepic2')} alt="" />
          </a>
          <a onClick={() => props.getDetailContent(id, cateid, url)} className="hover-scale">
            <img  src={props.data.get('titlepic3')} alt="" />
          </a>
        </p>
        <p className="info">
          <span className="newstag" style={{color: '#68a285'}}>{props.data.get('classname')}</span> {/* 栏目 */}
          <span><a onClick={() => props.getDetailContent(id, cateid, url)}  className="cmt-num">{props.data.get('befrom')}</a></span> {/* 来源 */}
          <span className="render-time">{props.data.get('newstime')}</span> {/* 时间 */}
        </p>
        <div className="operate">
          <a onClick={() => props.handelItemDetele(props.index)} className="del"><span>不感兴趣</span></a>
        </div>
      </div>
    </div>
  )
}

// 单图
const OnePicture = props => {
  const id = props.data.get('id')
  const cateid = props.data.get('cateid')
  const url  = props.data.get('url')

  return (
    <div className="newslist newsitem oneimg">
      <p className="hover-scale pic">
        <a onClick={() => props.getDetailContent(id, cateid, url)}><img src={props.data.get('titlepic')} alt=""/></a>
      </p>
      <div className="content">
        <h1><a onClick={() => props.getDetailContent(id, cateid, url)}>{props.data.get('title')}</a></h1>
        <p className="info">
          <span className="newstag" style={{color: "#5996fd"}}>{props.data.get('classname')}</span>
          <span><a onClick={() => props.getDetailContent(id, cateid, url)} className="cmt-num">{props.data.get('befrom')}</a></span>
          <span className="render-time">{props.data.get('newstime')}</span>
        </p>
        <div className="operate">
          <a onClick={() => props.handelItemDetele(props.index)} className="del"><span>不感兴趣</span></a>
        </div>
      </div>
    </div>
  )
}

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

class DetailFlow extends React.Component {
  constructor(props) {
    super(props);
    this.textInput = React.createRef();
  }
  componentDidMount() {
    // this.textInput.current.focusTextInput();
    console.log('1111', this.textInput)
  }
  render() {
  const {
    handelItemDetele,
    getDetailContent,
    loadItems,
    detailList,
    hasMoreItems
  }  = this.props
  let items = [];
  detailList.map((item, index) => {
    if (item.get('titlepic') && item.get('titlepic2') && item.get('titlepic3')) {
      items.push(
        <ThreePicture
          key={item.get('id')}
          index={index}
          data={item}
          handelItemDetele={handelItemDetele}
          getDetailContent={getDetailContent}
        />
      )
    } else if (item.get('titlepic') || item.get('titlepic2')) {
      // const diyElement = ''
      items.push(
        <OnePicture
          key={item.get('id')}
          index={index}
          data={item}
          handelItemDetele={handelItemDetele}
          getDetailContent={getDetailContent}
          // ref={(icon)=> {this.spinIcon = icon}}
          ref={this.textInput}
        />
        // <div className="newslist newsitem oneimg">
        //   <p className="hover-scale pic">

        //   </p>
        //   <div className="content">
        //     <h1>11111111111111111111111111111111</h1>
        //     <p className="info">
        //       <span className="newstag" style={{color: "#5996fd"}}>1111111111</span>
        //       <span><a  className="cmt-num">111111</a></span>
        //       <span className="render-time">2222222222</span>
        //     </p>
        //     <div className="operate">
        //       <a className="del"><span>不感兴趣</span></a>
        //     </div>
        //   </div>
        // </div>

      )

    }
  })
  console.log(items)
  return (
    <div id="detail_flow" className="totop_fixed">
      <InfiniteScroll
        // initialLoad={false}
        useWindow={false}
        pageStart={0}
        loadMore={(page) => loadItems(page, this.spinIcon)}
        hasMore={hasMoreItems}
        // loader={<div className="loader" key={0}>Loading ...</div>}
        loader={<div key={0} className="demo-loading-container"><Spin tip="努力加载中..." /></div>}
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
    loadItems(page, spinIcon) {
      console.log('spinIcon', spinIcon)
      dispatch(actionCreators.getItemList(page))
    },
    handelItemDetele(index) {
      dispatch(actionCreators.deteleItemList(index))
    },
    getDetailContent(id, cateid) {
      window.scroll(0, 0)
      dispatch(actionCreators.handleGetDetailContent(id, cateid))
    },
    spinIcon() {

    }
  }
}

export default connect(mapStart, mapDispatch)(DetailFlow);
