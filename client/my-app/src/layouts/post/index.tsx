import { Grid, makeStyles, Theme } from '@material-ui/core'
import { createStyles } from '@material-ui/styles'
import Header from 'components/Header'
import { fetchGetAllPost } from 'features/post/postSlice'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

function Post() {
  const classes = useStyles()
  const dispatch = useDispatch()

  useEffect(() => {
    const getPost = async () => {
      await dispatch(fetchGetAllPost())
    }

    getPost()
  }, [])

  return (
    <div className={classes.root}>
      <Header />
      <Grid container className={classes.wrap}>
        about
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
export default Post
