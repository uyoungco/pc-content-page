import React from 'react'


class BaiduAds extends React.Component{
  constructor(props) {
    super(props)
    this.state = {
      s: "_" + Math.random().toString(36).slice(2)
    }
  }
  componentDidMount() {
    (window.slotbydup=window.slotbydup || []).push({
      id: this.props.id,
      container: this.state.s
		});
  }

  render() {
    return (
      <div id={this.state.s}></div>
    )
  }
}

export default BaiduAds

// <!-- 请置于所有广告位代码之前 -->
// <script src="http://dup.baidustatic.com/js/ds.js"></script>
// <!-- 广告位：PC_首页_dj01_右2 -->
