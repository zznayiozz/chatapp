import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import userApi from 'api/authentication'

const initialState = {
  user: {},
}

export const fetchUserLogin = createAsyncThunk('user/fetchUserLogin', async (params: { userName: string; password: string }, thunkAPI) => {
  const { userName, password } = params
  const response = await userApi.login({ userName, password })

  return response
})

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchUserLogin.fulfilled, (state, action) => {
      state.user = action.payload
    })
  },
})

const { reducer: userReducer } = userSlice

export default userReducer
