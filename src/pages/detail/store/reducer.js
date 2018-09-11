import * as constants from './constants'
import { fromJS, List } from 'immutable'

const defaultState = fromJS({
  detailList: List([]),
  hasMoreItems: true
});

export default (state = defaultState, action) => {
  switch(action.type) {
    case constants.ADD_ITEM_LIST:
      const newsPush = state.get('detailList').push(action.data)
      return state.set('detailList', newsPush)
    case constants.DETELE_ITEM_LIST:
      const newsState =  state.get('detailList').map((item) => {
        item.map((itemm, index) => {
          if (itemm.get('id') === action.id) {
            itemm.delete(index)
          }
        });
      })
      console.log(newsState)
       console.log(state.set('detailList', newsState))
    default:
      return state
  }
}
