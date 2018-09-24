import React from 'react'
import { connect } from 'react-redux'

import { getProjectsAction } from 'state/dashboard/project'

import { withStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import Icon from '@material-ui/core/Icon'
import Button from '@material-ui/core/Button'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'

import Loading from 'components/Loading'
import PaginatedTable from 'components/PaginatedTable'

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
    minHeight: 285,
  },
})

class ProjectDetails extends React.Component {
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
    const item = data.filter(child => child.id === id)[0]
    const activeSprint = item
      .sprint
      .filter(sprint => sprint.state === 'active')[0]
    const members = []
    Object.keys(item.roles).forEach((key) => {
      item.roles[key].forEach((role) => {
        members.push({
          ...role,
          stream: key,
        })
      })
    })

    return {
      id: item.id,
      description: item.description === ''
        ? 'No Description'
        : item.description,
      name: item.name,
      stakeholder: item.lead.name,
      activeSprint: activeSprint
        ? ({
          name: activeSprint.name,
          startDate: activeSprint.startDate,
          endDate: activeSprint.endDate,
        })
        : null,
      members,
    }
  }

  prepareMembersRow = members => (
    members.map((member, i) => ({
      No: i + 1,
      Nama: member.name,
      Stream: member.stream,
    }))
  )

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
      return (
        <Paper
          elevation={1}
          className={classes.paper}
        >
          <Loading />
        </Paper>
      )
    }

    return (
      <Paper
        elevation={1}
        className={classes.paper}
      >
        <CardContent>
          <Grid
            container
            justify="space-between"
          >
            <div
              style={{
                flex: '1 0 410px',
              }}
            >
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
                  <MenuItem
                    onClick={() => {
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
                    ? (selectedProject.activeSprint
                      ? selectedProject.activeSprint.name
                      : 'No Active Sprint'
                    )
                    : 'Select a project first'
                  }
                />
                {selectedProject && selectedProject.activeSprint && [
                  <InfoText
                    key="sprint-start"
                    title="Active Sprint Start Date"
                    content={selectedProject
                      ? (new Date(selectedProject.activeSprint.startDate)).toDateString()
                      : 'Select a project first'
                    }
                  />,
                  <InfoText
                    key="sprint-end"
                    title="Active Sprint End Date"
                    content={selectedProject
                      ? (new Date(selectedProject.activeSprint.endDate)).toDateString()
                      : 'Select a project first'
                    }
                  />,
                ]}
              </Grid>
            </div>
            <div
              style={{
                flex: '1 0 450px',
              }}
            >
              {selectedProject
                  && selectedProject.members
                  && (
                    <Paper
                      elevation={3}
                    >
                      <PaginatedTable
                        title="Member"
                        data={this.prepareMembersRow(selectedProject.members)}
                      />
                    </Paper>
                  )
              }
            </div>
          </Grid>
        </CardContent>
      </Paper>
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
  connect(mapStateToProps, mapDispatchToProps)(ProjectDetails),
)
