import corsProxy from 'api/corsProxy'

const baseURL = process.env.REACT_APP_JIRA_API

export const getProjectsApi = () => (
  corsProxy.get(`${baseURL}/rest/agile/1.0/board`)
    .then((res) => {
      if (res.status === 401) {
        throw new Error('Unauthorized')
      } else if (res.status === 404) {
        throw new Error('Not Found')
      } else {
        console.log(res.data.values.map(item => item.id))
        return res.data.values.map(item => item.id)
      }
    })
    .then(boardIds => (
      boardIds.map(async (boardId) => {
        const projectId = await corsProxy.get(
          `${baseURL}/rest/agile/1.0/board/${boardId}/project`,
        ).then(res => res.data.values[0].id)

        const projectDetail = await corsProxy.get(
          `${baseURL}/rest/api/2/project/${projectId}`,
        ).then(res => res.data)

        const roles = {}
        await Promise.all(
          Object.keys(projectDetail.roles)
            .map(async (key) => {
              const actors = await corsProxy.get(projectDetail.roles[key])
                .then(res => res.data.actors)
              if (actors.length > 0) {
                roles[key] = actors
              }
            }),
        )

        return ({
          roles,
          sprint: await corsProxy.get(
            `${baseURL}/rest/agile/1.0/board/${boardId}/sprint`,
          ).then(res => res.data.values),
          boardId,

        })
      })
    ))
    .then(promises => Promise.all(promises))
    .catch(err => console.log(err))
)

export default {
  getProjectsApi,
}