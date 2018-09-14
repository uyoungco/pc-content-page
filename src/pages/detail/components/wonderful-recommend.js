import React from 'react'


const WonderfulRecommend = props => {
  return (
    <div className="aside-area wonderful-recommend">
      <h3 className="aside-title">{props.title}</h3>
      <ul className="aside-items">
        {
          props.data.map((item, index) => (
            <li className="aside-item" key={item.get('url')}>
              <a href={item.get('url')} target="_blank">
                <div className="hover-scale">
                  <img src={item.get('titlepic')} alt="" />
                </div>
              </a>
              <a href={item.get('url')} target="_blank">
                <h3>{item.get('title')}</h3>
              </a>
            </li>
          ))
        }
      </ul>
    </div>
  )
}

export default WonderfulRecommend
