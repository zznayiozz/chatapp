import { createStyles, Grid, makeStyles, Theme } from '@material-ui/core'

import Header from 'components/Header'
import Sidebar from 'components/sidebar/Sidebar'
import RightPane from 'components/rightPane/RightPane'
import MainChat from 'components/mainChat'
// import { io } from 'socket.io-client'
// const socket = io('ws://localhost:5000')

function Home() {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <Header />
      <Grid container className={classes.wrap}>
        <Sidebar name="Side Bar" />
        <MainChat />
        <RightPane name="Right Pane" />
      </Grid>
    </div>
  )
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      height: '100%',
      minHeight: '100%',
      display: 'flex',
      flexDirection: 'column',
    },
    wrap: {
      flex: 1,
    },
  })
)

export default Home
