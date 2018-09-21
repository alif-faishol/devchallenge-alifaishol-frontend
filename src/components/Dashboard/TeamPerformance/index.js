import React from 'react'
import { connect } from 'react-redux'

import { getProjectsAction } from 'state/dashboard/project'

import { withStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'

import Loading from 'components/Loading'
import DashboardContainer from 'components/Dashboard/DashboardContainer'

const InfoText = ({ title, content }) => (
  <Grid
    container
    direction="column"
    style={{
      marginBottom: 15,
    }}
  >
    <Typography
      variant="body1"
      color="textSecondary"
      gutterBottom
    >
      {title}
    </Typography>
    <Typography
      variant="body1"
    >
      {content}
    </Typography>
  </Grid>
)

const styles = theme => ({
  paper: {
    width: '100%',
    margin: theme.spacing.unit * 2,
    backgroundColor: 'white',
  },
})

class TeamPerformance extends React.Component {
  state = {
    selectedProject: '',
    open: false,
  }

  componentDidMount() {
    const { projects, getProjects } = this.props

    if (projects === null
      || (projects.length && projects.length < 0)
    ) {
      getProjects()
    }
  }

  prepareData = data => data.map((item) => {
    const activeSprint = item
      .sprint
      .filter(sprint => sprint.state === 'active')[0]

    return {
      id: item.id,
      description: item.description,
      name: item.name,
      stakeholder: item.lead.name,
      activeSprint: activeSprint && ({
        name: activeSprint.name,
        startDate: activeSprint.startDate,
        endDate: activeSprint.endDate,
      }),
    }
  })

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
      <DashboardContainer activeMenu="team-performance">
        <Grid
          container
        >
          <Paper
            elevation={1}
            className={classes.paper}
          >
            <CardContent>
              <Typography
                variant="title"
              >
                Project
                <InputLabel htmlFor="select-project">Select Project</InputLabel>
                <Select
                  inputProps={{
                    id: 'select-project',
                  }}
                  value={this.state.selectedProject}
                  onChange={({ target }) => {
                    this.setState({
                      selectedProject: target.value,
                    })
                  }}
                >
                  <MenuItem value="">Select Project</MenuItem>
                  {projects.map(project => (
                    <MenuItem
                      key={project.id}
                      value={project.id}
                    >
                      {project.name}
                    </MenuItem>
                  ))}
                </Select>
              </Typography>
              <Grid
                container
                direction="column"
              >
                <InfoText title="Description" content="uwu" />
                <InfoText title="Stackholder" content="uwu" />
                <InfoText title="Active Sprint" content="uwu" />
              </Grid>
            </CardContent>
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
  connect(mapStateToProps, mapDispatchToProps)(TeamPerformance),
)
