import { createSlice } from '@reduxjs/toolkit'
const initialState = {
  info: []
}
export const storeSlice = createSlice({
  name: 'store',
  initialState,
  reducers: {
    storeUpdate: (state, action) => {
      state.info = action.payload
    }
  }
})
export const { storeUpdate } = storeSlice.actions
export default storeSlice.reducer
