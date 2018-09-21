import corsProxy from 'api/corsProxy'

const baseURL = process.env.REACT_APP_JIRA_API

export const loginApi = (username, password) => (
  corsProxy.post(
    `${baseURL}/rest/auth/1/session`,
    { username, password },
  )
    .then(({ data }) => {
      if ('errors' in data) {
        throw new Error(data.errorMessages)
      }
    })
    .then(() => (
      corsProxy.get(`${baseURL}/rest/api/2/myself`)
    ))
    .then(({ data }) => {
      if ('errors' in data) {
        throw new Error(data.errorMessages)
      }
      return data
    })
)

export default {
  loginApi,
}
