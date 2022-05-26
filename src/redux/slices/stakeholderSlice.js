import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  stakeholders: [],
  relations: [],
  stakeholdersTypes: [],
  relationsTypes: [],
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
    addStakeholdersTypes: (state, action) => {
      state.stakeholdersTypes = action.payload
    },
    deleteStakeholder: (state, action) => {
      state.stakeholders = state.stakeholders.filter((item) => item.label !== action.payload)
    },
    deleteRelation: (state, action) => {
      state.relations.splice(
        state.relations.findIndex((item, i) => i === action.payload),
        1
      )
    },
    clearStakeholders: (state) => {
      state.stakeholders = []
    },
    clearRelations: (state) => {
      state.relations = []
    },
    addRelation: (state, action) => {
      state.relations.push(action.payload)
    },
    addRelationArray: (state, action) => {
      state.relations = action.payload
    },
    addRelationsTypes: (state, action) => {
      state.relationsTypes = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const {
  addStakeholdersTypes,
  addRelationsTypes,
  addStakeholder,
  deleteStakeholder,
  addStakeholderArray,
  clearStakeholders,
  addRelation,
  clearRelations,
  addRelationArray,
  deleteRelation,
} = stakeholderSlice.actions

export default stakeholderSlice.reducer
