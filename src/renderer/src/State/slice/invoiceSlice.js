import { createSlice } from '@reduxjs/toolkit'
const initialState = {
  active: 0,
  invoices: []
}
export const invoicesSlice = createSlice({
  name: 'invoices',
  initialState,
  reducers: {
    invoices: (state, action) => {
      state.invoices = action.payload
    },
    setActive: (state, action) => {
      state.active = action.payload
    }
  }
})
export const { invoices, setActive } = invoicesSlice.actions
export default invoicesSlice.reducer
