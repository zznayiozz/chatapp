import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import postApi from 'api/post'

const initialState = {
  posts: [],
}

export const fetchGetAllPost = createAsyncThunk('user/fetchGetAllPost', async (params, thunkAPI) => {
  const response = await postApi.getAll()

  return response.data
})

export const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchGetAllPost.fulfilled, (state, action) => {
      state.posts = action.payload
    })
  },
})

const { reducer: postReducer } = postSlice

export default postReducer
