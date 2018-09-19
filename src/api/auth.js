import axios from 'axios'

const jiraURL = process.env.JIRA_API

export const loginApi = (username, password) => (
  axios.post(
    `${jiraURL}/rest/auth/1/session`,
    { username, password },
  )
    .then(({ data }) => {
      if (data.error) {
        throw new Error(data.errorMessages[0])
      } else {
        return data
      }
    })
)

export default {
  loginApi,
}
