import React from 'react'
import {
  Formik,
  Form,
} from 'formik'
import { connect } from 'react-redux'

import { login } from 'state/auth'

import { withStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Divider from '@material-ui/core/Divider'
import Paper from '@material-ui/core/Paper'
import CardContent from '@material-ui/core/CardContent'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'

import CodexLogo from 'assets/images/codex-logo.png'

const styles = () => ({
  root: {
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100%',
  },
})

const Login = ({
  classes,
  _login,
}) => (
  <Grid
    container
    className={classes.root}
  >
    <Paper>
      <CardContent>
        <Formik
          initialValues={{ username: '', password: '' }}
          onSubmit={(values) => {
            _login(values.username, values.password)
          }}
        >
          {({
            values,
            handleChange,
            handleBlur,
          }) => (
            <Form>
              <List
                style={{
                  maxWidth: 350,
                }}
              >
                <ListItem>
                  <img
                    src={CodexLogo}
                    style={{
                      width: '100%',
                      padding: 5,
                    }}
                    alt="Codex Logo"
                  />
                </ListItem>
                <ListItem>
                  <div style={{ width: '100%' }}>
                    <Divider />
                  </div>
                </ListItem>
                <ListItem>
                  <TextField
                    fullWidth
                    name="username"
                    label="Username"
                    value={values.username}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </ListItem>
                <ListItem>
                  <TextField
                    fullWidth
                    name="password"
                    type="password"
                    label="Password"
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </ListItem>
                <ListItem>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                  >
                    Login
                  </Button>
                </ListItem>
              </List>
            </Form>
          )}
        </Formik>
      </CardContent>
    </Paper>
  </Grid>
)

const mapStateToProps = ({ auth }) => ({
  error: auth.error,
  isLogingIn: auth.isLogingIn,
})

const mapDispatchToProps = {
  _login: login,
}

export default withStyles(styles)(
  connect(mapStateToProps, mapDispatchToProps)(Login),
)
