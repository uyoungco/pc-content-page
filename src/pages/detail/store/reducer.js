import * as constants from './constants'
import { fromJS, List } from 'immutable'

const defaultState = fromJS({
  detailList: [],
  hasMoreItems: true
});

export default (state = defaultState, action) => {
  switch(action.type) {
    case constants.ADD_ITEM_LIST:
      const newsPush = state.get('detailList').push(...action.data)
      return state.set('detailList', newsPush)
    case constants.DETELE_ITEM_LIST:
      const newsState = state.get('detailList').remove(action.index)
      return state.set('detailList', newsState)
    default:
      return state
  }
}
