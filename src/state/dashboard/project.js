import {
  takeLatest,
  put,
  call,
} from 'redux-saga/effects'
import { push } from 'connected-react-router'

import reduxAsyncTypes from 'helpers/reduxAsyncTypes'
import { getProjectsApi } from 'api/project'

const GET_PROJECTS = reduxAsyncTypes('telkomcodex/dashboard/project/GET_PROJECTS')

const reducer = (state = {
  isLoading: false,
  error: null,
  data: null,
}, action = {}) => {
  switch (action.type) {
    case GET_PROJECTS.REQUEST:
      return {
        ...state,
        isLoading: true,
      }
    case GET_PROJECTS.SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: null,
        data: action.payload,
      }
    case GET_PROJECTS.ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      }
    default:
      return state
  }
}

export const getProjectsAction = () => ({
  type: GET_PROJECTS.REQUEST,
})

function* getProjectsSaga() {
  try {
    const response = yield call(getProjectsApi)
    yield put({ type: GET_PROJECTS.SUCCESS, payload: response })
  } catch (e) {
    if (e.message === 'Unauthorized') {
      yield put(push('/login'))
    } else {
      yield put({ type: GET_PROJECTS.ERROR, payload: e })
    }
  }
}

const sagaWatchers = [
  takeLatest(GET_PROJECTS.REQUEST, getProjectsSaga),
]

export default {
  reducer,
  sagaWatchers,
}
