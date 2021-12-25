import { createStyles, Grid, makeStyles, Theme } from '@material-ui/core'
import { useAppSelector } from 'app/hooks'
import BoxChat from 'components/boxChat'
import { useEffect, useRef } from 'react'

export default function MainChat() {
  const messages = useAppSelector((state) => state.posts.messages)
  const classes = useStyles()
  const scrollRef = useRef(null)

  useEffect(() => {
    if (scrollRef) {
      const elm: any = scrollRef.current
      elm.scrollTop = elm.scrollHeight
    }
  })

  return (
    <Grid container direction="column" item xs={7} className={classes.paper}>
      <Grid container item className={classes.main}>
        <div ref={scrollRef} className={classes.mainContent}>
          {messages.map((value: { messages: string; id: string }, index: number) => {
            return (
              <div key={value.id} className={index % 2 ? classes.leftMessage : classes.righttMessage}>
                {value.messages}
              </div>
            )
          })}
        </div>
      </Grid>

      <BoxChat />
    </Grid>
  )
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      textAlign: 'center',
      color: theme.palette.text.secondary,
      border: '1px solid #ccc',
    },
    main: {
      flex: 1,
      position: 'relative',
    },
    mainContent: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      overflow: 'auto',
      alignItems: 'flex-end',
      display: 'flex',
      flexDirection: 'column',
    },
    leftMessage: {
      display: 'flex',
      width: '100%',
      padding: 8,
      margin: '4px 0',
      boxSizing: 'border-box',
      whiteSpace: 'pre',
      textAlign: 'justify',
    },
    righttMessage: {
      display: 'flex',
      width: '100%',
      padding: 8,
      justifyContent: 'flex-end',
      margin: '4px 0',
      boxSizing: 'border-box',
      whiteSpace: 'pre',
      textAlign: 'justify',
    },
  })
)
