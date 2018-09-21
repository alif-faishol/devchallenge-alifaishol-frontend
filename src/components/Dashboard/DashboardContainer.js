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
    minHeight: '100%',
    display: 'flex',
    position: 'relative',
    animation: 'fadeIn 0.3s ease-out',
  },
  '@keyframes fadeIn': {
    from: {
      opacity: 0,
      bottom: -10,
    },
    to: {
      opacity: 1,
      bottom: 0,
    },
  },
  drawer: {
    backgroundColor: 'white !important',
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
          onClick={() => { history.push('/project') }}
          selected={activeMenu === 'project'}
          classes={{
            selected: classes.selectedMenu,
          }}
        >
          <ListItemText primary="Project" />
        </ListItem>
        <ListItem
          button
          onClick={() => { history.push('/team-performance') }}
          selected={activeMenu === 'team-performance'}
          classes={{
            selected: classes.selectedMenu,
          }}
        >
          <ListItemText primary="Team Performance" />
        </ListItem>
        <ListItem
          button
          onClick={() => { history.push('/calendar') }}
          selected={activeMenu === 'calendar'}
          classes={{
            selected: classes.selectedMenu,
          }}
        >
          <ListItemText primary="Calendar" />
        </ListItem>
      </List>
    </Drawer>
    <div style={{ flexGrow: 1 }}>
      {children}
    </div>
  </div>
)

export default withRouter(withStyles(styles)(DashboardContainer))
