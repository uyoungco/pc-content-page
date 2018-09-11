import React from 'react'


const data = [1,2,3,4,5,6,7,8]

const DayHotNews = props => {
  return (
    <div id="day_hot_news" className="aside-area">
      <h3 className="aside-title">{props.title}</h3>
      <ul className="aside-items">
      {
        data.map((item, index) => (
          <li className="aside-item" key={index}>
            <p className="hover-scale hot_news_img">
              <a href="/">
                <img src="https://p.ssl.qhimg.com/dmfd/122_84_/t0130b064223e88d746.jpg?size=640x808" alt="" />
              </a>
            </p>
            <p className="hot_news_right">
              <a href="/" className="hot_news_title">女生夏天穿打底裤不能踩的三个雷区，姑娘们可要记牢</a>
              <span className="hot_news_info">
                <span className="hot_news_cmt">大江新闻</span>
              </span>
            </p>
          </li>
        ))
      }

      </ul>
    </div>
  )
}

export default DayHotNews
