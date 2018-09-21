import axios from 'axios'


const corsProxy = `${process.env.REACT_APP_BACKEND_API}/cors`

axios.defaults.withCredentials = true

const post = (url, data) => axios.post(
  corsProxy,
  {
    url,
    method: 'POST',
    data: JSON.stringify(data),
  },
  {
    validateStatus: () => true,
  },
)

const get = url => axios.post(
  corsProxy,
  {
    url,
    method: 'GET',
  },
  {
    validateStatus: () => true,
  },
)

const put = (url, data) => axios.post(
  corsProxy,
  {
    url,
    method: 'PUT',
    data: JSON.stringify(data),
  },
  {
    validateStatus: () => true,
  },
)

export default ({
  post,
  get,
  put,
})
