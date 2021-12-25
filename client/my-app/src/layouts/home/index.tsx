import { createStyles, Grid, makeStyles, Theme } from '@material-ui/core'

import Header from 'components/Header'
import Sidebar from 'components/sidebar/Sidebar'
import RightPane from 'components/rightPane/RightPane'
import MainChat from 'components/mainChat'
import { io } from 'socket.io-client'
import { useEffect } from 'react'

function Home() {
  const classes = useStyles()

  useEffect(() => {
    const socket = io('ws://localhost:5000')

    socket.on('connnection', () => {
      console.log('connected to server')
    })

    socket.on('message', (message) => {
      console.log(message)
    })

    socket.on('disconnect', () => {
      console.log('Socket disconnecting')
    })
  }, [])

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
