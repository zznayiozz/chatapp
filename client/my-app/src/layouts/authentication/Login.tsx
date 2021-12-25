import { Button, Grid, Link, Paper, TextField, Typography } from '@material-ui/core'
import FormControl from '@material-ui/core/FormControl'
import IconButton from '@material-ui/core/IconButton'
import InputAdornment from '@material-ui/core/InputAdornment'
import { createStyles, makeStyles, Theme, withStyles } from '@material-ui/core/styles'
import Visibility from '@material-ui/icons/Visibility'
import VisibilityOff from '@material-ui/icons/VisibilityOff'
import { useAuth } from 'auth/AuthProvider'
import clsx from 'clsx'
import BackgroundForAuth from 'layouts/authentication/assets/images/backgroundForAuth.jpg'
import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexDirection: 'column',
      backgroundImage: `url(${BackgroundForAuth})`,
      minHeight: '100%',
      height: '100%',
    },
    warper: {
      display: 'flex',
      flex: 1,
      textAlign: 'center',
      padding: 20,
      flexDirection: 'column',
      justifyContent: 'center',
    },
    margin: {
      margin: theme.spacing(1),
    },
    withoutLabel: {
      marginTop: theme.spacing(3),
    },
    textField: {
      width: '40ch',
    },
    form: {
      position: 'relative',
      height: 250,
      width: 380,
      background: 'transparent',
    },
  })
)

interface State {
  userName: string
  password: string
  showPassword: boolean
}

const ValidationTextField = withStyles({
  root: {
    '& input:valid ~ fieldset': {
      borderColor: 'white',
      borderWidth: 2,
    },
    '& input:invalid ~  fieldset': {
      borderColor: 'white',
      borderWidth: 2,
    },
    '& input:valid:focus ~  fieldset': {
      borderLeftWidth: 6,
      padding: '4px !important', // override inline-style
    },
    '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
      borderColor: 'white',
      borderWidth: 2,
    },
    '& .MuiFormLabel-root, .MuiInputBase-root': {
      color: 'white',
      borderColor: 'white',
      borderWidth: 2,
    },
  },
})(TextField)

export default function LoginForm() {
  const auth = useAuth()
  let location = useLocation()
  const navigate = useNavigate()
  const classes = useStyles()
  const [values, setValues] = React.useState<State>({
    userName: '',
    password: '',
    showPassword: false,
  })

  const handleChange = (prop: keyof State) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [prop]: event.target.value })
  }

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword })
  }

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
  }

  const handleLogin = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    let from = location.state?.from?.pathname || '/'
    const { userName, password } = values

    auth.signin(userName, password, () => {
      navigate(from, { replace: true })
    })
  }

  return (
    <div className={classes.root}>
      <Grid container direction="column" justifyContent="center" alignItems="center" className={classes.warper}>
        <Paper variant="outlined" className={classes.form}>
          <Typography variant="h4" style={{ color: 'white' }}>
            Login
          </Typography>

          <FormControl className={clsx(classes.margin, classes.textField)}>
            <ValidationTextField
              fullWidth
              placeholder="User Name"
              required
              variant="outlined"
              value={values.userName}
              onChange={handleChange('userName')}
              id="validation-User-Name"
            />
          </FormControl>

          <FormControl className={clsx(classes.margin, classes.textField)}>
            <ValidationTextField
              fullWidth
              type={values.showPassword ? 'text' : 'password'}
              placeholder="Password"
              required
              variant="outlined"
              value={values.password}
              onChange={handleChange('password')}
              id="validation-password"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      color="secondary"
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                    >
                      {values.showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </FormControl>

          <Grid container direction="row" justifyContent="flex-end" style={{ marginTop: 16, padding: 16 }}>
            <Button variant="contained" color="primary" onClick={handleLogin}>
              Login
            </Button>
          </Grid>

          <Typography style={{ position: 'absolute', left: 8, bottom: 0 }}>
            <Link component="button" style={{ color: 'white' }} onClick={() => navigate('/register')}>
              Create an account?. register here
            </Link>
          </Typography>
        </Paper>
      </Grid>
    </div>
  )
}
