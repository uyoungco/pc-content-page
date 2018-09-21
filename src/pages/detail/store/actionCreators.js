
import axios from 'axios'
import * as constants from './constants'
import { fromJS } from 'immutable';
// import NewsFeed from '../ADS/360ads'


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
const loadingStart = switchlo => ({
  type: constants.LOADING_START,
  switchlo
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
  return async dispatch => {
    /* eslint-disable */
    const mediavNewsFeed = new NewsFeed();
    mediavNewsFeed.feedtype="index_xxl";
    mediavNewsFeed.options.showid = window.channel_name.smartxxl.id;
    const cheshi = (data) => ( console.log(data) )
    mediavNewsFeed.take(10, cheshi)
    console.log(mediavNewsFeed)

    dispatch(loadingStart(true))
    const getdata = (data) => {
      let articleContentArr = []
      data.content.split('[!--page--]')
      .filter(v => v)
      .map(v => articleContentArr.push(v))

      document.title =  `${data.title}-热点娱乐`
      if(window.history.pushState) {
        if (!window.location.origin) {
          window.location.origin = window.location.protocol + "//" + window.location.hostname + (window.location.port ? ':' + window.location.port: '');
        }
        const host = window.location.origin
        window.history.pushState({content: data.url,id:id},null, host + data.url)
      }


      const title = data.title
      const befrom = data.befrom
      const newstime = data.newstime
      const articleContent = articleContentArr
      dispatch(changeDetailContent(title, befrom, newstime, articleContent))
    }

    if(id === 1) {
      const contentData = window.INIT_DETAIL_CONTENT
      const res = await axios(`/m/news.php?cateid=${contentData.cateid}`)
      dispatch(changeDetailBotton(res.data))
      getdata(contentData)
      dispatch(loadingStart(false))
    } else {
      // axios(`/m/news.php?newsid=1224826`)
      const res = await axios(`/m/news.php?newsid=${id}&cateid=${cateid}`)

      getdata(res.data.articleInfo[0])
      dispatch(changeDetailBotton(res.data))
      dispatch(loadingStart(false))
      // .then(res => {
      // }).catch( error => console.error(error) )  // 错误处理
    }
  };
}
