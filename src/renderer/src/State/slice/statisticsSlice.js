import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  todaysStats: {},
  monthlyStats: {income: 0, discount: 0, due: 0},
  everyDayStats: []
}

export const statsSlice = createSlice({
  name: 'stats',
  initialState,
  reducers: {
    setTodaysStats: (state, action) => {
      state.todaysStats = action.payload
    },
    setMonthlyStats: (state, action) => {
      state.monthlyStats = action.payload
    },
    setEveryDayStats: (state, action) => {
      state.everyDayStats = action.payload
    }
  }
})
export const { setTodaysStats, setMonthlyStats, setEveryDayStats } = statsSlice.actions
export default statsSlice.reducer
