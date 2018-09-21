import React from 'react'
import { connect } from 'react-redux'

import { getProjectsAction } from 'state/dashboard/project'

import { withStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import Input from '@material-ui/core/Input'
import Icon from '@material-ui/core/Icon'
import Button from '@material-ui/core/Button'
import Menu from '@material-ui/core/Menu'
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
    selectedProject: null,
    anchorEl: null,
  }

  componentDidMount() {
    const { projects, getProjects } = this.props

    if (projects === null
      || (projects.length && projects.length < 0)
    ) {
      getProjects()
    }
  }

  getProjectById = (id, data) => {
    const project = data.filter(project => project.id === id)[0]
    const activeSprint = project
      .sprint
      .filter(sprint => sprint.state === 'active')[0]

    return {
      id: project.id,
      description: project.description === ''
        ? 'No Description'
        : project.description,
      name: project.name,
      stakeholder: project.lead.name,
      activeSprint: activeSprint && ({
        name: activeSprint.name,
        startDate: activeSprint.startDate,
        endDate: activeSprint.endDate,
      }),
    }
  }

  render() {
    const {
      classes,
      projects,
      isLoading,
    } = this.props

    const {
      selectedProject,
      anchorEl,
    } = this.state

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
                style={{
                  marginBottom: 25,
                }}
              >
                Project
                <Button
                  variant="outlined"
                  style={{
                    marginLeft: 25,
                  }}
                  color="primary"
                  onClick={({ currentTarget }) => {
                    this.setState({
                      anchorEl: currentTarget,
                    })
                  }}
                >
                  {selectedProject === null
                    ? 'Select a Project'
                    : selectedProject.name
                  }
                  <Icon>
                    arrow_drop_down
                  </Icon>
                </Button>
                <Menu
                  anchorEl={anchorEl}
                  open={anchorEl !== null}
                  onClose={() => {
                    this.setState({
                      anchorEl: null,
                    })
                  }}
                >
                  <MenuItem onClick={() => {
                    this.setState({
                      selectedProject: null,
                      anchorEl: null,
                    })
                  }}
                >
                  Select Project
                </MenuItem>
                  {projects.map(project => (
                    <MenuItem
                      key={project.id}
                      onClick={() => {
                        this.setState({
                          selectedProject: this.getProjectById(project.id, projects),
                          anchorEl: null,
                        })
                      }}
                    >
                      {project.name}
                    </MenuItem>
                  ))}
                </Menu>
              </Typography>
              <Grid
                container
                direction="column"
              >
                <InfoText
                  title="Description"
                  content={selectedProject
                    ? selectedProject.description
                    : 'Select a project first'
                  }
                />
                <InfoText
                  title="Stakeholder"
                  content={selectedProject
                    ? selectedProject.stakeholder
                    : 'Select a project first'
                  }
                />
                <InfoText
                  title="Active Sprint"
                  content={selectedProject
                    ? selectedProject.activeSprint.name
                    : 'Select a project first'
                  }
                />
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
