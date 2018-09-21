import React from 'react'

import Button from '@material-ui/core/Button'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import Icon from '@material-ui/core/Icon'

class ProjectStatus extends React.Component {
  state = {
    anchorEl: null,
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
              // handleSelect
              this.setState({
                anchorEl: null,
              })
            }}
          >
            In Queue
          </MenuItem>
          <MenuItem
            onClick={() => {
              // handleSelect
              this.setState({
                anchorEl: null,
              })
            }}
          >
            On Going
          </MenuItem>
          <MenuItem
            onClick={() => {
              // handleSelect
              this.setState({
                anchorEl: null,
              })
            }}
          >
            Complete
          </MenuItem>
          <MenuItem
            onClick={() => {
              // handleSelect
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

export default ProjectStatus
