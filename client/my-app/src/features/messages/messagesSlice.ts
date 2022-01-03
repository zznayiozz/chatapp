import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  messages: [],
}

export const postsSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    addMessage: (state: { messages: any[] }, action) => {
      state.messages.push(action.payload)
    },
  },
})

// Action creators are generated for each case reducer function
export const { addMessage } = postsSlice.actions

export default postsSlice.reducer
