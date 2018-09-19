import React from 'react'
import {
  Switch,
  Route,
  Redirect,
} from 'react-router-dom'

import Dashboard from 'components/Dashboard'
import Login from 'components/Login'
import NotFound from 'components/NotFound'

const RootRoutes = () => (
  <Switch>
    <Redirect exact from="/" to="/dashboard" />
    <Route path="/login" component={Login} />
    <Route path="/dashboard" component={Dashboard} />
    <Route path="/404" component={NotFound} />
    <Redirect to="/404"/>
  </Switch>
)

export default RootRoutes
