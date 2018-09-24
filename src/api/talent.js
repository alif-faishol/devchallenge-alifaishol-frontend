import corsProxy from 'api/corsProxy'

const baseURL = process.env.REACT_APP_JIRA_API

export const getTalentPointApi = () => (
  corsProxy.get(`${baseURL}/rest/api/2/user/search?username=.&startAt=0&maxResults=1000`)
    .then((res) => {
      if (res.status === 401) {
        throw new Error('Unauthorized')
      } else if (res.status === 404) {
        throw new Error('Not Found')
      } else {
        return res.data.map(item => ({ key: item.key, name: item.name }))
      }
    })
    .then(users => (
      users.map(async (user) => {
        const userIssues = await corsProxy.post(
          `${baseURL}/rest/api/2/search`,
          {
            jql: `assignee="${user.key}"`,
            startAt: 0,
            maxResults: 100,
            fields: [
              'customfield_10106',
              'status',
            ],
          },
        )
          .then((res) => {
            if (res.data.issues !== undefined) {
              return res.data.issues.map(item => item.fields)
            }
            return undefined
          })

        const filterFunc = status => issue => (
          issue && issue.status && issue.status.name === status
        )

        const todoIssues = userIssues ? userIssues.filter(filterFunc('To Do')) : []
        const doneIssues = userIssues ? userIssues.filter(filterFunc('Done')) : []
        const inProgressIssues = userIssues ? userIssues.filter(filterFunc('In Progress')) : []

        return {
          name: user.name,
          pointBurn: doneIssues
            .reduce((total, cur) => total + cur.customfield_10106, 0),
          pointRemaining: todoIssues
            .reduce((total, cur) => total + cur.customfield_10106, 0),
          pointQueue: inProgressIssues
            .reduce((total, cur) => total + cur.customfield_10106, 0),
        }
      })
    ))
    .then(promises => Promise.all(promises))
)

export default {
  getTalentPointApi,
}
