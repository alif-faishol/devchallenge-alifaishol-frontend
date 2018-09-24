import React from 'react'

import Grid from '@material-ui/core/Grid'

import DashboardContainer from 'components/Dashboard/DashboardContainer'
import ProjectDetails from './ProjectDetails'
import TalentPerformance from './TalentPerformance'

const TeamPerformance = () => (
  <DashboardContainer
    active="team-performance"
  >
    <Grid
      container
    >
      <ProjectDetails />
      <TalentPerformance />
    </Grid>
  </DashboardContainer>
)

export default TeamPerformance
