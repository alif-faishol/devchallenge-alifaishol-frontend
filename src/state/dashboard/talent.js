import {
  takeLatest,
  put,
  call,
} from 'redux-saga/effects'
import { push } from 'connected-react-router'

import reduxAsyncTypes from 'helpers/reduxAsyncTypes'
import { getTalentPointApi } from 'api/talent'

const GET_TALENT_POINT = reduxAsyncTypes('telkomcodex/dashboard/project/GET_TALENT_POINT')

const reducer = (state = {
  isLoading: false,
  error: null,
  data: null,
}, action = {}) => {
  switch (action.type) {
    case GET_TALENT_POINT.REQUEST:
      return {
        ...state,
        isLoading: true,
      }
    case GET_TALENT_POINT.SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: null,
        data: action.payload,
      }
    case GET_TALENT_POINT.ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      }
    default:
      return state
  }
}

export const getTalentPointAction = () => ({
  type: GET_TALENT_POINT.REQUEST,
})

function* getTalentPointSaga() {
  try {
    const response = yield call(getTalentPointApi)
    yield put({ type: GET_TALENT_POINT.SUCCESS, payload: response })
  } catch (e) {
    console.log(e)
    if (e.message === 'Unauthorized') {
      yield put(push('/login'))
    } else {
      yield put({ type: GET_TALENT_POINT.ERROR, payload: e })
    }
  }
}

const sagaWatchers = [
  takeLatest(GET_TALENT_POINT.REQUEST, getTalentPointSaga),
]

export default {
  reducer,
  sagaWatchers,
}
