import React from 'react'

import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Table from '@material-ui/core/Table'
import TablePagination from '@material-ui/core/TablePagination'
import TableBody from '@material-ui/core/TableBody'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'
import TableFooter from '@material-ui/core/TableFooter'
import TableHead from '@material-ui/core/TableHead'
import IconButton from '@material-ui/core/IconButton'
import Icon from '@material-ui/core/Icon'

const actionsStyles = theme => ({
  root: {
    flexShrink: 0,
    color: theme.palette.text.secondary,
    marginLeft: theme.spacing.unit * 2.5,
  },
});

class TablePaginationActions extends React.Component {
  handleFirstPageButtonClick = (event) => {
    this.props.onChangePage(event, 0)
  }

  handleBackButtonClick = (event) => {
    this.props.onChangePage(event, this.props.page - 1)
  }

  handleNextButtonClick = (event) => {
    this.props.onChangePage(event, this.props.page + 1)
  }

  handleLastPageButtonClick = (event) => {
    this.props.onChangePage(
      event,
      Math.max(0, Math.ceil(this.props.count / this.props.rowsPerPage) - 1),
    )
  }

  render() {
    const {
      classes,
      count,
      page,
      rowsPerPage,
    } = this.props;

    return (
      <div className={classes.root}>
        <IconButton
          onClick={this.handleFirstPageButtonClick}
          disabled={page === 0}
          aria-label="First Page"
        >
          <Icon>first_page</Icon>
        </IconButton>
        <IconButton
          onClick={this.handleBackButtonClick}
          disabled={page === 0}
          aria-label="Previous Page"
        >
          <Icon>keyboard_arrow_left</Icon>
        </IconButton>
        <IconButton
          onClick={this.handleNextButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="Next Page"
        >
          <Icon>keyboard_arrow_right</Icon>
        </IconButton>
        <IconButton
          onClick={this.handleLastPageButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="Last Page"
        >
          <Icon>last_page</Icon>
        </IconButton>
      </div>
    );
  }
}

const TablePaginationActionsWrapped = withStyles(actionsStyles, { withTheme: true })(
  TablePaginationActions,
);

const styles = theme => ({
  TCRoot: {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  TCRootHead: {
    backgroundColor: theme.palette.background.secondary,
    borderBottom: `3px solid ${theme.palette.primary.main}`,
  },
})

class PaginatedTable extends React.Component {
  state = {
    rows: this.props.data,
    page: 0,
    rowsPerPage: 5,
  }

  handleChangePage = (event, page) => {
    this.setState({ page })
  }

  handleChangeRowsPerPage = (event) => {
    this.setState({ rowsPerPage: event.target.value })
  }

  keys = Object.keys(this.state.rows[0])

  render() {
    const {
      rows,
      page,
      rowsPerPage,
    } = this.state

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
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
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
          <TableFooter>
            <TableRow>
              <TablePagination
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onChangePage={this.handleChangePage}
                onChangeRowsPerPage={this.handleChangeRowsPerPage}
                ActionsComponent={TablePaginationActionsWrapped}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </div>
    )
  }
}

export default withStyles(styles)(PaginatedTable)
