import { configureStore } from '@reduxjs/toolkit'
import stakeholderSlice from 'redux/slices/stakeholderSlice'
export const store = configureStore({
  reducer: {
    stakeholders: stakeholderSlice,
  },
})
