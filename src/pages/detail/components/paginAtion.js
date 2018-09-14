import React from 'react'
import { connect } from 'react-redux'
import { actionCreators } from '../store'


const Pagination = props => (
  <div className="pagination">
  {
    props.page === 0 ? null : <a onClick={() => props.handleChangePage(props.page - 1)}>上一页</a>
  }
  {
    props.articleContent.map((item, index) => {
      const indextwo = index + 1
      if(props.page === index) {
        return <b key={index}>{indextwo}</b>
      } else {
        return <a onClick={() => props.handleChangePage(index)} key={index}>{indextwo}</a>
      }
    })
  }
  {
    props.page === props.totalPage - 1 ? null : <a onClick={() => props.handleChangePage(props.page + 1)}>下一页</a>
  }
  </div>
)



const mapState = state => ({
  page: state.getIn(['detail', 'page']),
  totalPage: state.getIn(['detail', 'totalPage']),
  articleContent: state.getIn(['detail', 'articleContent'])
})
const mapDispatch = dispatch => ({
  handleChangePage(index) {
    window.scroll(0, 0)
    dispatch(actionCreators.changePage(index))
  }
})

export default connect(mapState, mapDispatch)(Pagination)
