import axios from 'axios'
import * as constants from './constants'
import { fromJS } from 'immutable';


const addItemList = data => ({
  type: constants.ADD_ITEM_LIST,
  data: fromJS(data)
})





export const deteleItemList = id => {
  console.log('id', id)
  return {
    type: constants.DETELE_ITEM_LIST,
    id
  }
}

export const getItemList = page => {
  return dispatch => {
    axios(`/m/ajaxlist.php?page=${page}`)
    .then(res => {
      dispatch(addItemList(res.data))
    }).catch( error => console.error(error) )  // 错误处理
  }
}
