import React from 'react'

import '../style.less'

class DetailFlow extends React.Component {
  render() {
    return (
      <div id="detail_flow" className="totop_fixed">
        <div className="newslist">
          <div className="content">
            <h1><a onClick={() => this.handleClick()}></a>心理学：选出你最喜欢的沙发，测这辈子和你羁绊最深的人是谁</h1>
            <p className="pic3">
              <a href="#">
                <img src="https://p0.ssl.qhimgs4.com/dmfd/122_84_/t011c0c7d632fc5e63b.jpg?size=640x408" alt="" />
              </a>
              <a href="#">
                <img onerror="imgError(this)" src="https://p0.ssl.qhimgs4.com/dmfd/122_84_/t011c0c7d632fc5e63b.jpg?size=640x408" alt="" />
              </a>
              <a href="#">
                <img onerror="imgError(this)" src="https://p0.ssl.qhimgs4.com/dmfd/122_84_/t011c0c7d632fc5e63b.jpg?size=640x408" alt="" />
              </a>
            </p>
            <p class="info">

            </p>
          </div>
        </div>
      </div>
    )
  }
}

export default DetailFlow
