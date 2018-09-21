import React from 'react'
import {
  Switch,
  Route,
  Redirect,
} from 'react-router-dom'

import Project from 'components/Dashboard/Project'
import TeamPerformance from 'components/Dashboard/TeamPerformance'
import Login from 'components/Login'
import NotFound from 'components/NotFound'

const RootRoutes = () => (
  <Switch>
    <Redirect exact from="/" to="/dashboard/project" />

    <Route path="/login" component={Login} />

    <Redirect exact from="/dashboard" to="/dashboard/project" />
    <Route path="/dashboard/project" component={Project} />
    <Route path="/dashboard/team-performance" component={TeamPerformance} />

    <Route path="/404" component={NotFound} />
    <Redirect to="/404"/>
  </Switch>
)

export default RootRoutes
