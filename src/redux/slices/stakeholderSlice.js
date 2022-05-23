import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  stakeholders: [],
  relations: [],
  selectedStakeholder: {},
}

export const stakeholderSlice = createSlice({
  name: 'stakeholder',
  initialState,
  reducers: {
    addStakeholder: (state, action) => {
      state.stakeholders.push(action.payload)
    },
    addStakeholderArray: (state, action) => {
      state.stakeholders = action.payload
    },
    deleteStakeholder: (state, action) => {
      state.stakeholders = state.stakeholders.filter((item) => item.name !== action.payload)
    },
    clearStakeholders: (state) => {
      state.stakeholders = []
    },
  },
})

// Action creators are generated for each case reducer function
export const { addStakeholder, deleteStakeholder, addStakeholderArray, clearStakeholders } = stakeholderSlice.actions

export default stakeholderSlice.reducer
