import { createStyles, Grid, makeStyles, Theme } from '@material-ui/core'

type RightPaneProps = {
  name: string
}

function RightPane(props: RightPaneProps) {
  const classes = useStyles()

  return (
    <Grid container item xs className={classes.paper}>
      <p>{props.name}</p>
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
  })
)

export default RightPane
