import { createSlice } from '@reduxjs/toolkit'
const initialState = {
  count: 0
}
export const invoiceCountSlice = createSlice({
  name: 'invoiceCount',
  initialState,
  reducers: {
    invoiceCount: (state, action) => {
      state.count = action.payload
    }
  }
})
export const { invoiceCount } = invoiceCountSlice.actions
export default invoiceCountSlice.reducer
