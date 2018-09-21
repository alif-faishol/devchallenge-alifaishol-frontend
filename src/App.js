import React from 'react'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'connected-react-router'

import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'

import RootRoutes from 'routes/RootRoutes'

import configureStore from 'configureStore'

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#53B9EC',
      contrastText: '#FFF',
    },
    secondary: {
      main: '#F55151',
    },
    divider: '#DEE3ED',
    background: {
      default: 'white',
      secondary: '#F5F7FA',
    },
  },
})

const App = () => (
  <Provider store={configureStore.store}>
    <MuiThemeProvider theme={theme}>
      <ConnectedRouter history={configureStore.history}>
        <RootRoutes />
      </ConnectedRouter>
    </MuiThemeProvider>
  </Provider>
)

export default App
