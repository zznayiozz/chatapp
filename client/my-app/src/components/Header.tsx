import { AppBar, Button, IconButton, makeStyles, Toolbar, Typography } from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu'
import { useAuth } from 'auth/AuthProvider'
import { useNavigate } from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}))

function Header() {
  const classes = useStyles()
  const auth = useAuth()
  const navigate = useNavigate()

  return (
    <AppBar position="static" color="primary">
      <Toolbar>
        <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" className={classes.title}>
          News
        </Typography>
        <Button color="inherit" onClick={() => navigate('/post')}>
          Post
        </Button>

        <Button
          color="inherit"
          onClick={() =>
            auth.signout(() => {
              navigate('/login', { replace: true })
            })
          }
        >
          Log Out
        </Button>
      </Toolbar>
    </AppBar>
  )
}

export default Header
