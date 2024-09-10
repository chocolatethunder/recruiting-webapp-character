import { createSlice } from '@reduxjs/toolkit'
import { ATTRIBUTE_LIST, CLASS_LIST, SKILL_LIST } from '../consts'
import { getCharacterClasses, isCharacterLimitReached } from '../utils/utils'

const generateNewCharacter = () => {
  return {
    attributes: ATTRIBUTE_LIST.reduce((obj, item) => {
      return {
        ...obj,
        [item]: {
          value: 10,
          modifier: 0,
        },
      }
    }, {}),
    classes: Object.keys(CLASS_LIST).reduce((obj, item) => {
      return { ...obj, [item]: false }
    }, {}),
  }
}

const initialState = {
  characters: [generateNewCharacter()],
  ui: {
    errors: {
      maxCharacterAttributesReached: false,
    },
  },
}

export const characterSlice = createSlice({
  name: 'characters',
  initialState,
  reducers: {
    addCharacter: (state) => {
      state.characters = [...state.characters, generateNewCharacter()]
    },
    incrementAttribute: (state, action) => {
      if (!isCharacterLimitReached(state.characters[action.payload.id])) {
        state.characters[action.payload.id].attributes[
          action.payload.attr
        ].value += 1
        state.characters[action.payload.id].attributes[
          action.payload.attr
        ].modifier += 1
      } else {
        state.ui.errors.maxCharacterAttributesReached = true
      }
    },
    decrementAttribute: (state, action) => {
      if (
        state.characters[action.payload.id].attributes[action.payload.attr]
          .modifier > 0
      ) {
        state.characters[action.payload.id].attributes[
          action.payload.attr
        ].value -= 1
        state.characters[action.payload.id].attributes[
          action.payload.attr
        ].modifier -= 1
      }
    },
    setClassState: (state, action) => {
      state.characters[action.payload.id].classes[action.payload.class] =
        action.payload.active
    },
    clearErrors: (state) => {
      state.ui.errors = {
        maxCharacterAttributesReached: false,
      }
    },
  },
})

export const {
  addCharacter,
  incrementAttribute,
  decrementAttribute,
  setClassState,
  clearErrors,
} = characterSlice.actions

export default characterSlice.reducer
