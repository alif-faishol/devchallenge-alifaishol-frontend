import { combineReducers } from 'redux'

import project from './project'
import talent from './talent'

export const reducer = combineReducers({
  project: project.reducer,
  talent: talent.reducer,
})

export const sagaWatchers = [
  ...project.sagaWatchers,
  ...talent.sagaWatchers,
]

export default {
  reducer,
  sagaWatchers,
}
