import { createSlice } from '@reduxjs/toolkit'
const initialState = {
  status: { type: '', data: {}, state: false }
}
export const updateSlice = createSlice({
  name: 'updateState',
  initialState,
  reducers: {
    updateState: (state, action) => {
      state.status.type = action.payload.type
      state.status.data = action.payload.data
      state.status.state = action.payload.state
    }
  }
})
export const { updateState } = updateSlice.actions
export default updateSlice.reducer
