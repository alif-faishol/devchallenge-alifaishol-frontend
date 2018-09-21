import React from 'react'
import { connect } from 'react-redux'

import { getProjectsAction } from 'state/dashboard/project'

import { withStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import Icon from '@material-ui/core/Icon'

import PaginatedTable from 'components/PaginatedTable'
import DashboardContainer from 'components/Dashboard/DashboardContainer'
import Loading from 'components/Loading'

const ProjectStatus = ({
  status,
  classes,
}) => {
  let color
  switch (status) {
    case 'In Queue':
      color = 'rgb(147, 147, 147)'
      break
    case 'Rejected':
      color = '#F55151'
      break
    case 'Complete':
      color = '#45BFB7'
      break
    default:
      color = '#53B9EC'
  }
  return (
    <div>
      <Button
        size="small"
        style={{
          color,
          textTransform: 'initial',
          paddingRight: 0,
        }}
      >
        {status}
        <Icon
          style={{
            color: '#53B9EC',
          }}
        >
          arrow_drop_down
        </Icon>
      </Button>
    </div>
  )
}

const styles = theme => ({
  root: {
  },
  paper: {
    width: '100%',
    margin: theme.spacing.unit * 2,
    backgroundColor: 'white',
  },
})

class Project extends React.Component {
  state = {
    data: [],
  }

  componentDidMount() {
    const { getProjects } = this.props

    getProjects()
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.projects !== this.props.projects
      && this.props.projects && this.props.projects.length > 0
    ) {
      this.setState({
        data: this.createTableData(this.props.projects),
      })
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
    } = this.props

    if (this.state.data.length === 0) {
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
            <PaginatedTable data={this.state.data} />
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
