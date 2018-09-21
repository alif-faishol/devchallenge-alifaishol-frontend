import React from 'react'

import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'

const styles = theme => ({
  TCRoot: {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  TCRootHead: {
    backgroundColor: theme.palette.background.secondary,
    borderBottom: `3px solid ${theme.palette.primary.main}`,
  },
})

class CustomTable extends React.Component {
  keys = Object.keys(this.props.rows[0])

  render() {
    const {
      rows,
    } = this.props

    const {
      classes,
    } = this.props

    return (
      <div
        style={{
          overflowX: 'auto',
        }}
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell colSpan={this.keys.length} classes={{ root: classes.TCRoot }}>
                <Typography variant="title">
                  Queue All Project
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              {this.keys.map((key, i) => (
                <TableCell
                  classes={{ root: classes.TCRootHead }}
                  key={key + i}
                >
                  {key}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .map((row, i) => (
                  <TableRow key={i}>
                    {this.keys.map((key, j) => (
                      <TableCell
                        classes={{ root: classes.TCRoot }}
                        key={j + i}
                      >
                        {row[key]}
                      </TableCell>
                    ))}
                  </TableRow>
              ))
            }
          </TableBody>
        </Table>
      </div>
    )
  }
}

export default withStyles(styles)(CustomTable)
