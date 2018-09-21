import React from 'react'

import { withStyles } from '@material-ui/core/styles'
import Drawer from '@material-ui/core/Drawer'
import Grid from '@material-ui/core/Grid'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'

const Dashboard = () => (
  <Grid
    container
  >
    <Drawer
      variant="permanent"
    >
      <List>
        <ListItem button>
          <ListItemText primary="Project" />
        </ListItem>
        <ListItem button>
          <ListItemText primary="Team Performance" />
        </ListItem>
        <ListItem button>
          <ListItemText primary="Calendar" />
        </ListItem>
      </List>
    </Drawer>
  </Grid>
)

export default Dashboard
