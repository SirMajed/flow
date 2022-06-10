import { configureStore } from '@reduxjs/toolkit'
import stakeholderSlice from 'redux/slices/stakeholderSlice'
import uiSlice from './slices/uiSlice'
export const store = configureStore({
  reducer: {
    stakeholders: stakeholderSlice,
    ui: uiSlice
  },
})
