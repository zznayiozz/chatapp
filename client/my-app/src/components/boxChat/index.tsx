import { Grid, Button, TextField, createStyles, makeStyles, Theme } from '@material-ui/core'
import { nanoid } from '@reduxjs/toolkit'
import { findByLabelText } from '@testing-library/react'
import { useAppDispatch } from 'app/hooks'
import { addMessage } from 'features/messages/messagesSlice'
import React, { useRef } from 'react'

function BoxChat() {
  const dispatch = useAppDispatch()
  const classes = useStyles()
  const inputMessageRef = useRef<any>(null)

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    if (!inputMessageRef.current) return
    inputMessageRef.current.value = event.target.value
  }

  const handlePostMessage = () => {
    if (!inputMessageRef.current.value) return
    dispatch(addMessage({ id: nanoid(), messages: inputMessageRef.current.value, userId: 'jfdghskd' }))
    inputMessageRef.current.value = null
  }

  return (
    <Grid container item className={classes.inForm}>
      <div style={{ bottom: 0, width: '100%' }}>
        <div style={{ display: 'flex', marginBottom: 8 }}>
          <div className={classes.root}>
            <Button variant="contained" color="primary">
              PropoCanDidate
            </Button>
            <Button variant="contained" color="primary">
              PropoCanDidate
            </Button>
          </div>
          <div className={classes.root} style={{ display: 'flex', width: 50, justifyContent: 'flex-end' }}>
            <Button type="button" variant="contained" color="primary" onClick={handlePostMessage}>
              Send
            </Button>
          </div>
        </div>

        <div className={classes.root}>
          <TextField inputRef={inputMessageRef} maxRows={7} fullWidth multiline id="outlined-basic" label="Message" variant="outlined" onChange={handleChange} />
        </div>
      </div>
    </Grid>
  )
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    inForm: {
      position: 'relative',
      minHeight: 110,
      borderTop: '1px solid yellow',
      padding: 8,
    },
    root: {
      display: 'flex',
      flex: 1,
      '& > *': {
        margin: theme.spacing(0.5),
      },
    },
  })
)

export default BoxChat
