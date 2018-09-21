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
import CircularProgress from '@material-ui/core/CircularProgress'
import Typography from '@material-ui/core/Typography'

import CodexLogo from 'assets/images/codex-logo.png'

const styles = theme => ({
  root: {
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100%',
    paddingTop: 50,
    paddingBottom: 50,
    backgroundColor: theme.palette.background.secondary,
  },
  content: {
    backgroundColor: 'white',
  },
  wrapper: {
    width: '100%',
    position: 'relative',
  },
  buttonProgress: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
})

const Login = ({
  classes,
  isLoggingIn,
  _login,
  error,
}) => (
  <Grid
    container
    className={classes.root}
  >
    <Paper className={classes.content} >
      <CardContent>
        <Formik
          initialValues={{ username: '', password: '' }}
          onSubmit={(values) => {
            _login(values.username, values.password)
          }}
          validate={(values) => {
            const errors = {}
            Object.keys(values).forEach((key) => {
              if (values[key].length < 1) {
                errors[key] = `${key.charAt(0).toUpperCase() + key.slice(1)} is required`
              }
            })
            return errors
          }}
        >
          {({
            values,
            errors,
            touched,
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
                    error={errors.username && touched.username}
                    helperText={errors.username && touched.username && errors.username}
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
                    error={errors.password && touched.password}
                    helperText={errors.password && touched.password && errors.password}
                    name="password"
                    type="password"
                    label="Password"
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </ListItem>
                <ListItem>
                  <div className={classes.wrapper}>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    disabled={isLoggingIn}
                    fullWidth
                  >
                    Login
                  </Button>
                  {isLoggingIn && (
                    <CircularProgress
                      size={24}
                      className={classes.buttonProgress}
                    />
                  )}
                  </div>
                </ListItem>
                {error && error.message && (
                  <ListItem>
                    <Typography variant="caption" color="error">
                      {error.message}
                    </Typography>
                  </ListItem>
                )}
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
  isLoggingIn: auth.isLoggingIn,
})

const mapDispatchToProps = {
  _login: login,
}

export default withStyles(styles)(
  connect(mapStateToProps, mapDispatchToProps)(Login),
)
