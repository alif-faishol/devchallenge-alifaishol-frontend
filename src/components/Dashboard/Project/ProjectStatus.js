import React from 'react'

import Button from '@material-ui/core/Button'
import Icon from '@material-ui/core/Icon'

class ProjectStatus extends React.Component {
  render() {
    const { status } = this.props

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
      </div>
    )
  }
}

export default ProjectStatus
