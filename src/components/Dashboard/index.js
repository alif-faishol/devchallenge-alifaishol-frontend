import React from 'react'
import { connect } from 'react-redux'

import { getProjectsAction } from 'state/dashboard/project'

import { withStyles } from '@material-ui/core/styles'
import Drawer from '@material-ui/core/Drawer'
import Grid from '@material-ui/core/Grid'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Button from '@material-ui/core/Button'

const styles = theme => ({
  root: {
    backgroundColor: theme.palette.background,
    width: '100%',
    minHeight: '100%',
  },
  drawer: {
    backgroundColor: 'white !important',
    position: 'relative',
  },
  selectedMenu: {
    borderBottom: `3px solid ${theme.palette.primary.main}`,
  },
})

const Dashboard = ({
  classes,
  getProjects,
}) => (
  <div>
    <Grid
      container
      className={classes.root}
    >
      <Button onClick={getProjects}>load project</Button>
    </Grid>
    <Drawer
      variant="permanent"
      classes={{ paper: classes.drawer }}
    >
      <List>
        <ListItem button>
          <ListItemText primary="Project" />
        </ListItem>
        <ListItem
          button
          selected
          classes={{
            selected: classes.selectedMenu,
          }}
        >
          <ListItemText primary="Team Performance" />
        </ListItem>
        <ListItem button>
          <ListItemText primary="Calendar" />
        </ListItem>
      </List>
    </Drawer>
  </div>
)

const mapStateToProps = ({ dashboard }) => ({
  projects: dashboard.project.data,
  isLoading: dashboard.project.isLoading,
  error: dashboard.project.error,
})

const mapDispatchToProps = {
  getProjects: getProjectsAction,
}

export default withStyles(styles)(
  connect(mapStateToProps, mapDispatchToProps)(Dashboard),
)
