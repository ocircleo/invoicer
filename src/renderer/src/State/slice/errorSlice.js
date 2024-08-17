import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  error: false,
  message: 'no error'
}
export const errorSlice = createSlice({
  name: 'error',
  initialState,
  reducers: {
    updateError: (state, action) => {
      state.error = action.payload.error
      state.message = action.payload.message
    }
  }
})
export const { updateError } = errorSlice.actions
export default errorSlice.reducer
