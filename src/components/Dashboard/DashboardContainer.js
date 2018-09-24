import React from 'react'
import { withRouter } from 'react-router-dom'

import { withStyles } from '@material-ui/core/styles'
import Drawer from '@material-ui/core/Drawer'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'

import CodexLogo from 'assets/images/codex-logo.png'

const styles = theme => ({
  root: {
    backgroundColor: theme.palette.background.secondary,
    width: '100%',
    height: '100%',
    display: 'flex',
  },
  childrenContainer: {
    flexGrow: 1,
    animation: 'fadeIn 0.3s ease-out',
    position: 'relative',
    overflow: 'auto',
  },
  '@keyframes fadeIn': {
    from: {
      opacity: 0,
      left: -20,
    },
    to: {
      opacity: 1,
      left: 0,
    },
  },
  drawer: {
    backgroundColor: 'white !important',
    overflow: 'auto',
    position: 'relative',
    width: 250,
  },
  selectedMenu: {
    borderBottom: `3px solid ${theme.palette.primary.main}`,
    borderTop: `1px solid ${theme.palette.divider}`,
    backgroundColor: `${theme.palette.background.secondary} !important`,
  },
})

const DashboardContainer = ({
  classes,
  activeMenu,
  children,
  history,
}) => (
  <div
    className={classes.root}
  >
    <Drawer
      variant="permanent"
      classes={{ paper: classes.drawer }}
    >
      <List>
        <ListItem>
          <img
            src={CodexLogo}
            style={{
              width: '100%',
              padding: 5,
            }}
            alt="Codex Logo"
          />
        </ListItem>
        <ListItem
          button
          onClick={() => { history.push('/dashboard/project') }}
          selected={activeMenu === 'project'}
          classes={{
            selected: classes.selectedMenu,
          }}
        >
          <ListItemText primary="Project" />
        </ListItem>
        <ListItem
          button
          onClick={() => { history.push('/dashboard/team-performance') }}
          selected={activeMenu === 'team-performance'}
          classes={{
            selected: classes.selectedMenu,
          }}
        >
          <ListItemText primary="Team Performance" />
        </ListItem>
        <ListItem
          button
          onClick={() => { history.push('/dashboard/calendar') }}
          selected={activeMenu === 'calendar'}
          classes={{
            selected: classes.selectedMenu,
          }}
        >
          <ListItemText primary="Calendar" />
        </ListItem>
      </List>
    </Drawer>
    <div className={ classes.childrenContainer }>
      {children}
    </div>
  </div>
)

export default withRouter(withStyles(styles)(DashboardContainer))
