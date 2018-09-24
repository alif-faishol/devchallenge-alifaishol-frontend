import React from 'react'
import { connect } from 'react-redux'

import { getTalentPointAction } from 'state/dashboard/talent'

import { withStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'

import Loading from 'components/Loading'
import PaginatedTable from 'components/PaginatedTable'

const styles = theme => ({
  paper: {
    width: '100%',
    margin: theme.spacing.unit * 2,
    backgroundColor: 'white',
    minHeight: 285,
  },
})

class TalentPerformance extends React.Component {
  prepareTableData = rows => (
    rows
      .sort((a, b) => {
        if (a.pointBurn < b.pointBurn) {
          return 1
        }
        if (a.pointBurn > b.pointBurn) {
          return -1
        }
        return 0
      })
      .map((row, i) => ({
        No: i + 1,
        Nama: row.name,
        'Point Burn': row.pointBurn,
        'Point Remaining': row.pointRemaining,
        'Point Queue': row.pointQueue,
      }))
  )

  componentDidMount() {
    const { talentPoint, getTalentPoint } = this.props

    if (talentPoint === null
      || (talentPoint.length && talentPoint.length < 0)
    ) {
      getTalentPoint()
    }
  }

  render() {
    const {
      classes,
      talentPoint,
      isLoading,
    } = this.props

    if (talentPoint === null
      || (talentPoint.length && talentPoint.length < 0)
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
        className={ classes.paper }
      >
        <PaginatedTable
          title="Best Talent Performance"
          data={this.prepareTableData(talentPoint)}
        />
      </Paper>
    )
  }
}

const mapStateToProps = ({ dashboard }) => ({
  talentPoint: dashboard.talent.data,
  isLoading: dashboard.talent.isLoading,
  error: dashboard.talent.error,
})

const mapDispatchToProps = {
  getTalentPoint: getTalentPointAction,
}

export default withStyles(styles)(
  connect(mapStateToProps, mapDispatchToProps)(TalentPerformance),
)
