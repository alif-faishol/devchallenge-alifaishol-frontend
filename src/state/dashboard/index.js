import { combineReducers } from 'redux'

import project from './project'

export const reducer = combineReducers({
  project: project.reducer,
})

export const sagaWatchers = [
  ...project.sagaWatchers,
]

export default {
  reducer,
  sagaWatchers,
}
