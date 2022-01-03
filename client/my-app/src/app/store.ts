import { configureStore } from '@reduxjs/toolkit'
import postsSlice from '../features/messages/messagesSlice'
import userSlice from '../features/authentication/userSlice'
import postReducer from 'features/post/postSlice'

export const store = configureStore({
  reducer: { posts: postsSlice, auth: userSlice, listCourses: postReducer },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
