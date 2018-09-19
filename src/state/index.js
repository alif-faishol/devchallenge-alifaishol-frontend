import { combineReducers } from 'redux'
import { all } from 'redux-saga/effects'

import auth from './auth'

export const rootReducer = combineReducers({
  auth: auth.reducer,
})

export function* rootSaga() {
  yield all([
    ...auth.sagaWatchers,
  ])
}
