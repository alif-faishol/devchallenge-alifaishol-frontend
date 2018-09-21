import React from 'react'
import { connect } from 'react-redux'

import { getProjectsAction } from 'state/dashboard/project'

import { withStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'

import PaginatedTable from 'components/PaginatedTable'
import DashboardContainer from 'components/Dashboard/DashboardContainer'
import Loading from 'components/Loading'
import ProjectStatus from './ProjectStatus'

const styles = theme => ({
  paper: {
    width: '100%',
    margin: theme.spacing.unit * 2,
    backgroundColor: 'white',
  },
})

class Project extends React.Component {
  componentDidMount() {
    const { projects, getProjects } = this.props

    if (projects === null
      || (projects.length && projects.length < 0)
    ) {
      getProjects()
    }
  }

  createTableData = data => data.map((item, i) => ({
    No: i + 1,
    'Nama Project': item.name,
    Unit: '-',
    Stakeholder: item.lead.name,
    Sprint: item.sprint.length,
    Status: <ProjectStatus status={item.status} />,
  }))

  render() {
    const {
      classes,
      projects,
      isLoading,
    } = this.props

    if (projects === null
      || (projects.length && projects.length < 0)
      || isLoading
    ) {
      return <Loading />
    }

    return (
      <DashboardContainer activeMenu="project">
        <Grid
          container
        >
          <Paper
            elevation={1}
            className={classes.paper}
          >
            <PaginatedTable
              title="All Project Queue"
              data={this.createTableData(projects)}
            />
          </Paper>
        </Grid>
      </DashboardContainer>
    )
  }
}

const mapStateToProps = ({ dashboard }) => ({
  projects: dashboard.project.data,
  isLoading: dashboard.project.isLoading,
  error: dashboard.project.error,
})

const mapDispatchToProps = {
  getProjects: getProjectsAction,
}

export default withStyles(styles)(
  connect(mapStateToProps, mapDispatchToProps)(Project),
)
