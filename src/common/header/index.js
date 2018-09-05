import React from 'react'
import './style.less'

class Header extends React.Component {
  render() {

    return (
      <div id="head" className="nhead">
        <div className="container">
          <a className="logo" href='http://localhost:3000/' />
          <div id="nnav">
            <div className="nnav-wrap">
              <ul className="nnav-items" id="nnav_main">
                <li>
                  <a href="#" className="nnav-item">首页<span></span></a>
                </li>
                <li>
                  <a href="#" className="nnav-item">首页<span></span></a>
                </li>
                <li>
                  <a href="#" className="nnav-item">首页<span></span></a>
                </li>
                <li>
                  <a href="#" className="nnav-item">首页<span></span></a>
                </li>
                <li>
                  <a href="#" className="nnav-item">首页<span></span></a>
                </li>
              </ul>
            </div>
          </div>
          <div className="header-right">

          </div>
        </div>
      </div>
    );
  }
}

export default Header
