import React from 'react'
import CircularProgress from '@material-ui/core/CircularProgress'

const Loading = () => (
  <div
    style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
      minHeight: '100%',
    }}
  >
    <CircularProgress />
  </div>
)

export default Loading
