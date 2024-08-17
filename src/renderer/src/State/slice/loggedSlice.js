import { createSlice } from '@reduxjs/toolkit'
const initialState = {
  logged: false,
}
export const loggedSlice = createSlice({
  name: 'logged',
  initialState,
  reducers: {
    setLogged: (state, action) => {
      state.logged = action.payload
    }
  }
})
export const { setLogged } = loggedSlice.actions
export default loggedSlice.reducer
