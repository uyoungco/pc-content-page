import React from 'react'

import '../style.less'

class DetailFlow extends React.Component {
  render() {
    return (
      <div id="detail_flow" className="totop_fixed">
        {/* 三图 */}
        <div className="newslist newsitem">
          <div className="content">
            <h1><a href="/" >心理学：选出你最喜欢的沙发，测这辈子和你羁绊最深的人是谁</a></h1>
            <p className="pic3">
              <a href="/" className="hover-scale">
                <img src="https://p0.ssl.qhimgs4.com/dmfd/122_84_/t011c0c7d632fc5e63b.jpg?size=640x408" alt="" />
              </a>
              <a href="/" className="hover-scale">
                <img src="https://p0.ssl.qhimgs4.com/dmfd/122_84_/t011c0c7d632fc5e63b.jpg?size=640x408" alt="" />
              </a>
              <a href="/" className="hover-scale">
                <img  src="https://p0.ssl.qhimgs4.com/dmfd/122_84_/t011c0c7d632fc5e63b.jpg?size=640x408" alt="" />
              </a>
            </p>
            <p className="info">
              <span class="newstag" style={{color: '#68a285'}}>历史</span>
              <span>
                <a href="/" className="cmt-num">来源</a>
              </span>
              <div className="render-time">2分钟前</div>
            </p>
            <div className="operate">
              <a href="/" className="del"><span>不感兴趣</span></a>
            </div>
          </div>
        </div>

        {/* 一图 */}
        <div className="newslist newsitem oneimg">
          <p className="hover-scale pic">
            <a href="/"><img src="https://p0.ssl.qhimgs4.com/dmfd/122_84_/t01fc93a7bcfe6e64b5.jpg?size=383x574" alt=""/></a>
          </p>
          <div className="content">
            <h1><a href="/">一桌喝32瓶！曝刘强东案件女当事人被灌大量红酒</a></h1>
            <p className="info">
              <span className="newstag" style={{color: "#5996fd"}}>社会</span>
              <div className="render-time">9分钟前</div>
            </p>
            <div className="operate">
              <a href="/" className="del"><span>不感兴趣</span></a>
            </div>
          </div>
        </div>

        {/* 大图广告 */}
        <div className="newsitem fourimgs allclk">
          <div className="content">
            <h1><a href="/">上海市辖区小两口下班没事在家赚钱，半年后存款惊人！</a></h1>
            <p className="pic4 bigpic">
              <a href="/" className="hover-scale"><img src="https://s3m.mediav.com/galileo/589147-b6f9dcf8aacb29628f0243e2d3bfe2f3.jpg" alt=""/></a>
            </p>
            <p className="info">
              <span class="newstag">广告</span>
              <span>摇钱树投资 · 顶新</span>
            </p>
            <div className="operate">
              <a href="/" className="del"><span>不感兴趣</span></a>
            </div>
          </div>
        </div>



        {/* 三图 */}
        <div className="newslist newsitem">
          <div className="content">
            <h1><a href="/" >心理学：选出你最喜欢的沙发，测这辈子和你羁绊最深的人是谁</a></h1>
            <p className="pic3">
              <a href="/" className="hover-scale">
                <img src="https://p0.ssl.qhimgs4.com/dmfd/122_84_/t011c0c7d632fc5e63b.jpg?size=640x408" alt="" />
              </a>
              <a href="/" className="hover-scale">
                <img src="https://p0.ssl.qhimgs4.com/dmfd/122_84_/t011c0c7d632fc5e63b.jpg?size=640x408" alt="" />
              </a>
              <a href="/" className="hover-scale">
                <img  src="https://p0.ssl.qhimgs4.com/dmfd/122_84_/t011c0c7d632fc5e63b.jpg?size=640x408" alt="" />
              </a>
            </p>
            <p className="info">
              <span class="newstag" style={{color: '#68a285'}}>历史</span>
              <span>
                <a href="/" className="cmt-num">来源</a>
              </span>
              <div className="render-time">2分钟前</div>
            </p>
            <div className="operate">
              <a href="/" className="del"><span>不感兴趣</span></a>
            </div>
          </div>
        </div>

        {/* 一图 */}
        <div className="newslist newsitem oneimg">
          <p className="hover-scale pic">
            <a href="/"><img src="https://p0.ssl.qhimgs4.com/dmfd/122_84_/t01fc93a7bcfe6e64b5.jpg?size=383x574" alt=""/></a>
          </p>
          <div className="content">
            <h1><a href="/">一桌喝32瓶！曝刘强东案件女当事人被灌大量红酒</a></h1>
            <p className="info">
              <span className="newstag" style={{color: "#5996fd"}}>社会</span>
              <div className="render-time">9分钟前</div>
            </p>
            <div className="operate">
              <a href="/" className="del"><span>不感兴趣</span></a>
            </div>
          </div>
        </div>

        {/* 大图广告 */}
        <div className="newsitem fourimgs allclk">
          <div className="content">
            <h1><a href="/">上海市辖区小两口下班没事在家赚钱，半年后存款惊人！</a></h1>
            <p className="pic4 bigpic">
              <a href="/" className="hover-scale"><img src="https://s3m.mediav.com/galileo/589147-b6f9dcf8aacb29628f0243e2d3bfe2f3.jpg" alt=""/></a>
            </p>
            <p className="info">
              <span class="newstag">广告</span>
              <span>摇钱树投资 · 顶新</span>
            </p>
            <div className="operate">
              <a href="/" className="del"><span>不感兴趣</span></a>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default DetailFlow
