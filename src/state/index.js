import { combineReducers } from 'redux'
import { all } from 'redux-saga/effects'

import auth from './auth'
import dashboard from './dashboard'

export const rootReducer = combineReducers({
  auth: auth.reducer,
  dashboard: dashboard.reducer,
})

export function* rootSaga() {
  yield all([
    ...auth.sagaWatchers,
    ...dashboard.sagaWatchers,
  ])
}
