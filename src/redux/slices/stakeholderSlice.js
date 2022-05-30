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
      // state.stakeholders = []
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
    // ================================================= \\
    addPosX: (state, action) => {
      const updatedArray = state.stakeholders // copy of original
      const { posX, id } = action.payload
      let selectedItem = updatedArray.findIndex((element) => {
        return element.id === id
      })
      updatedArray[selectedItem].x = posX
      state.stakeholders = updatedArray
    },
    addPosY: (state, action) => {
      const updatedArray = state.stakeholders // copy of original
      const { posY, id } = action.payload
      let selectedItem = updatedArray.findIndex((element) => {
        return element.id === id
      })
      updatedArray[selectedItem].y = posY
      state.stakeholders = updatedArray
    },
    hideNode: (state, action) => {
      const updatedArray = state.stakeholders // copy of original
      const { hidden, id } = action.payload
      let selectedItem = updatedArray.findIndex((element) => {
        return element.id === id
      })
      updatedArray[selectedItem].hidden = hidden
      state.stakeholders = updatedArray
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
  addPosX,
  addPosY,
  hideNode,
} = stakeholderSlice.actions

export default stakeholderSlice.reducer
