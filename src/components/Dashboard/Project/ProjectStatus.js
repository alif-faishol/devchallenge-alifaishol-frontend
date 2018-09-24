import React from 'react'
import { connect } from 'react-redux'

import { getProjectsAction } from 'state/dashboard/project'

import { changeProjectStatusApi } from 'api/project'

import Button from '@material-ui/core/Button'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import Icon from '@material-ui/core/Icon'

class ProjectStatus extends React.Component {
  state = {
    anchorEl: null,
  }

  handleChange = async (status) => {
    const { getProjects, boardId } = this.props
    await changeProjectStatusApi(boardId, status)
    getProjects()
  }

  render() {
    const { status } = this.props

    const { anchorEl } = this.state

    let color
    switch (status) {
      case 'In Queue':
        color = 'rgb(147, 147, 147)'
        break
      case 'Rejected':
        color = '#F55151'
        break
      case 'Complete':
        color = '#45BFB7'
        break
      default:
        color = '#53B9EC'
    }

    return (
      <div>
        <Button
          size="small"
          style={{
            color,
            textTransform: 'initial',
            paddingRight: 0,
          }}
          onClick={({ currentTarget }) => {
            this.setState({
              anchorEl: currentTarget,
            })
          }}
        >
          {status}
          <Icon
            style={{
              color: '#53B9EC',
            }}
          >
            arrow_drop_down
          </Icon>
        </Button>
        <Menu
          anchorEl={anchorEl}
          open={anchorEl !== null}
          onClose={() => {
            this.setState({
              anchorEl: null,
            })
          }}
        >
          <MenuItem
            onClick={() => {
              this.handleChange('In Queue')
              this.setState({
                anchorEl: null,
              })
            }}
          >
            In Queue
          </MenuItem>
          <MenuItem
            onClick={() => {
              this.handleChange('On Going')
              this.setState({
                anchorEl: null,
              })
            }}
          >
            On Going
          </MenuItem>
          <MenuItem
            onClick={() => {
              this.handleChange('Complete')
              this.setState({
                anchorEl: null,
              })
            }}
          >
            Complete
          </MenuItem>
          <MenuItem
            onClick={() => {
              this.handleChange('Rejected')
              this.setState({
                anchorEl: null,
              })
            }}
          >
            Rejected
          </MenuItem>
        </Menu>
      </div>
    )
  }
}

const mapDispatchToProps = {
  getProjects: getProjectsAction,
}

export default connect(null, mapDispatchToProps)(ProjectStatus)
