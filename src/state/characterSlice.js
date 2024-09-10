import { createSlice } from '@reduxjs/toolkit'
import { ATTRIBUTE_LIST, CLASS_LIST, SKILL_LIST } from '../consts'

const generateNewCharacter = () => {
  return ATTRIBUTE_LIST.reduce(
    (obj, item) => {
      return {
        ...obj,
        [item]: 0,
      }
    },
    {
      classes: Object.keys(CLASS_LIST).reduce((obj, item) => {
        return { ...obj, [item]: false }
      }, {}),
    }
  )
}

const initialState = {
  characters: [generateNewCharacter()],
}

export const characterSlice = createSlice({
  name: 'characters',
  initialState,
  reducers: {
    addCharacter: (state) => {
      state.characters = [...state.characters, generateNewCharacter()]
    },
    incrementAttribute: (state, action) => {
      state.characters[action.payload.id][action.payload.attr] += 1
    },
    decrementAttribute: (state, action) => {
      if (state.characters[action.payload.id][action.payload.attr] > 0) {
        state.characters[action.payload.id][action.payload.attr] -= 1
      }
    },
  },
})

export const { addCharacter, incrementAttribute, decrementAttribute } =
  characterSlice.actions

export default characterSlice.reducer
