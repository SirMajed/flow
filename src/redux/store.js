import { configureStore } from '@reduxjs/toolkit'
import stakeholderSlice from '@slices/stakeholderSlice'
export const store = configureStore({
  reducer: {
    stakeholders: stakeholderSlice,
  },
})
