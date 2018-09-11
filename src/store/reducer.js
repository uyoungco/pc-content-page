import { combineReducers } from 'redux-immutable'

import { reducer as detailReducer } from '../pages/detail/store'

const reducer =  combineReducers({
  detail: detailReducer
})

export default reducer
