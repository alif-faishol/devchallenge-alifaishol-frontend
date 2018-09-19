import React from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'

import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'

import RootRoutes from 'routes/RootRoutes'

import store from 'configureStore'

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#598B99',
    },
    secondary: {
      main: '#d32f2f',
    },
  },
})

const App = () => (
  <Provider store={store}>
    <MuiThemeProvider theme={theme}>
      <Router>
        <RootRoutes />
      </Router>
    </MuiThemeProvider>
  </Provider>
)

export default App
