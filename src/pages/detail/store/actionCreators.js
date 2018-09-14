import axios from 'axios'
import * as constants from './constants'
import { fromJS } from 'immutable';


const addItemList = data => ({
  type: constants.ADD_ITEM_LIST,
  data: fromJS(data)
})
const changeDetailContent = (title, befrom, newstime, articleContent) => ({
  type: constants.CHANGE_DETAIL_CONTENT,
  totalPage: articleContent.length,
  title, // 文章辩题
  befrom, // 来源
  newstime, // 时间
  articleContent: fromJS(articleContent) //文章内容 数组
})
const changeDetailBotton = data => ({
  type: constants.CHANGE_DETAIL_BOOTON,
  hotnews: fromJS(data.hotnews),
  xgtj: fromJS(data.xgtj)
})



export const changePage = page => ({
  type: constants.CHANGE_PAGE,
  page
})
// 不敢兴趣
export const deteleItemList = index => ({
  type: constants.DETELE_ITEM_LIST,
  index
})
//  左侧列表获取
export const getItemList = page => {
  return dispatch => {
    axios(`/m/ajaxlist.php?page=${page}`)
    // axios(`/api/ajaxlist.json`)
    .then(res => {
      dispatch(addItemList(res.data))
    }).catch( error => console.error(error) )  // 错误处理
  }
}
//  文章内容获取
export const handleGetDetailContent = (id, cateid)  => {
  return dispatch => {
    const getdata = (data) => {
      let articleContentArr = []
      data.content.split('[!--empirenews.page--]')
      .filter(v => v)
      .map(v => articleContentArr.push(v))

      const title = data.title
      const befrom = data.befrom
      const newstime = data.newstime
      const articleContent = articleContentArr
      dispatch(changeDetailContent(title, befrom, newstime, articleContent))
    }


    if(id === 1) {
      const data = window.INIT_DETAIL_CONTENT
      axios(`/m/news.php?cateid=${data.cateid}`)
      .then(res => {
        dispatch(changeDetailBotton(res.data))
      })
      getdata(data)
    } else {
      axios(`/m/news.php?newsid=${id}&cateid=${cateid}`)
      // axios(`/m/news.php?newsid=1224826`)
      .then(res => {
        getdata(res.data.articleInfo[0])
        dispatch(changeDetailBotton(res.data))
      }).catch( error => console.error(error) )  // 错误处理
    }
  };
}




