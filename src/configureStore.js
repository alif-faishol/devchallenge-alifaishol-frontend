import {
  createStore,
  applyMiddleware,
  compose,
} from 'redux'
import createSagaMiddleware from 'redux-saga'
import { createBrowserHistory } from 'history'
import { connectRouter, routerMiddleware } from 'connected-react-router'

import { rootReducer, rootSaga } from 'state'

const history = createBrowserHistory()

/* eslint-disable no-underscore-dangle */
const composeEnhanchers = (process.env.NODE_ENV === 'development'
  && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__)
  || compose;
/* eslint-enable */

const sagaMiddleware = createSagaMiddleware()

const store = createStore(
  connectRouter(history)(rootReducer),
  composeEnhanchers(
    applyMiddleware(
      routerMiddleware(history),
      sagaMiddleware,
    ),
  ),
)

sagaMiddleware.run(rootSaga)

export default {
  history,
  store,
}
