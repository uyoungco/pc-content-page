import * as constants from './constants'
import { fromJS } from 'immutable'

const defaultState = fromJS({
  detailList: [],
  hasMoreItems: true,
  page: 0, // 当前页
  totalPage: 0, // 总页数

  title: '', // 文章辩题
  befrom: '', // 来源
  newstime: '', // 时间
  articleContent: [] // 文章内容
});

export default (state = defaultState, action) => {
  switch(action.type) {
    case constants.ADD_ITEM_LIST: // 初始化左侧信息流
      const newsPush = state.get('detailList').push(...action.data)
      return state.set('detailList', newsPush)
    case constants.DETELE_ITEM_LIST: // 删除左侧信息流谋篇文章
      const newsState = state.get('detailList').remove(action.index)
      return state.set('detailList', newsState)
    case constants.CHANGE_DETAIL_CONTENT: // 内容获取
      return  state.merge({
        page: 0,
        totalPage: action.totalPage,
        title: action.title,
        befrom: action.befrom,
        newstime: action.newstime,
        articleContent: action.articleContent
      })
    case constants.CHANGE_PAGE: // 翻页
      return state.set('page', action.page)
    default:
      return state
  }
}
