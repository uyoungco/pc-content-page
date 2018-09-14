import React from 'react'


const DayHotNews = props => {
  return (
    <div id="day_hot_news" className="aside-area">
      <h3 className="aside-title">{props.title}</h3>
      <ul className="aside-items">
      {
        props.data.map((item, index) => (
          <li className="aside-item" key={item.get('url')}>
            <p className="hover-scale hot_news_img">
            <a href={item.get('url')} target="_blank">
                <img src={item.get('titlepic')} alt="" />
              </a>
            </p>
            <p className="hot_news_right">
            <a href={item.get('url')} target="_blank" className="hot_news_title">{item.get('title')}</a>
              <span className="hot_news_info">
                <span className="hot_news_cmt">{item.get('befrom')}</span>
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
