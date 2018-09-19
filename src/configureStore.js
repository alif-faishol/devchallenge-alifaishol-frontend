import {
  createStore,
  applyMiddleware,
  compose,
} from 'redux'
import createSagaMiddleware from 'redux-saga'

import { rootReducer, rootSaga } from 'state'

/* eslint-disable no-underscore-dangle */
const composeEnhanchers = (process.env.NODE_ENV === 'development'
  && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__)
  || compose;
/* eslint-enable */

const sagaMiddleware = createSagaMiddleware()

const store = createStore(
  rootReducer,
  composeEnhanchers(
    applyMiddleware(sagaMiddleware),
  ),
)

sagaMiddleware.run(rootSaga)

export default store
