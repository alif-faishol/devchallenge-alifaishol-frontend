import {
  takeLatest,
  put,
  call,
} from 'redux-saga/effects'

import reduxAsyncTypes from 'helpers/reduxAsyncTypes'
import { loginApi } from 'api/auth'

const LOGIN_USER = reduxAsyncTypes('telkomcodex/auth/LOGIN_USER')

const reducer = (state = {
  loggedIn: false,
  isLogingIn: false,
  isError: null,
  userData: null,
}, action = {}) => {
  switch (action.type) {
    case LOGIN_USER.REQUEST:
      return {
        ...state,
        isLogingIn: true,
      }
    case LOGIN_USER.SUCCESS:
      return {
        ...state,
        isLogingIn: false,
        isError: null,
        userData: action.payload,
      }
    case LOGIN_USER.ERROR:
      return {
        ...state,
        isLogingIn: false,
        isError: action.payload,
      }
    default:
      return state
  }
}

export const login = (username, password) => ({
  type: LOGIN_USER.REQUEST,
  payload: { username, password },
})

function* loginSaga(action) {
  try {
    const { username, password } = action.payload
    const response = yield call(loginApi(username, password))
    yield put({ type: LOGIN_USER.SUCCESS, payload: response })
  } catch (e) {
    yield put({ type: LOGIN_USER.FAILED, payload: e })
  }
}

const sagaWatchers = [
  takeLatest(LOGIN_USER.REQUEST, loginSaga),
]

export default {
  reducer,
  sagaWatchers,
}
