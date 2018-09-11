import React from 'react'


const data = [1,2,3,4,5,6,7,8,9]

const WonderfulRecommend = props => {
  return (
    <div className="aside-area wonderful-recommend">
      <h3 className="aside-title">{props.title}</h3>
      <ul className="aside-items">
        {
          data.map((item, index) => (
            <li className="aside-item" key={index}>
              <a href="/">
                <div className="hover-scale">
                  <img src="https://p0.ssl.qhimgs4.com/dmfd/285_180_/t0140fcf652477b7882.jpg?size=682x355" alt="" />
                </div>
              </a>
              <a href="/">
                <h3>在农村，有3个证件的农民“发财”了，每月都能领钱</h3>
              </a>
            </li>
          ))
        }
      </ul>
    </div>
  )
}

export default WonderfulRecommend
