import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { SAVE_URL, SKILL_LIST } from '../consts'
import {
  generateNewCharacter,
  isCharacterLimitReached,
  isCharacterSkillReached,
} from '../utils/utils'

export const fetchGameData = createAsyncThunk(
  'gameData/getGameData',
  async (arg, { rejectWithValue }) => {
    const response = await fetch(SAVE_URL)
    if (!response.ok) {
      return rejectWithValue([], 'URL not found')
    }
    return response.json()
  }
)

const initialState = {
  characters: [generateNewCharacter()],
  skillCheck: {
    character: 1,
    skill: SKILL_LIST[0].name,
    skillValue: 0,
    rolled: 0,
    dc: 0,
    result: false,
  },
  ui: {
    errors: {
      maxCharacterAttributesReached: false,
      maxSkillsPointsReached: false,
    },
  },
}

const incrementSkills = (state, charId, skillArray, attrModifier) => {
  skillArray.forEach((skill) => {
    state.characters[charId].skills[skill].points += 1
    state.characters[charId].skills[skill].total =
      state.characters[charId].skills[skill].points +
      state.characters[charId].attributes[attrModifier].modifier
  })
}

const decrementSkills = (state, charId, skillArray, attrModifier) => {
  skillArray.forEach((skill) => {
    state.characters[charId].skills[skill].points -= 1
    state.characters[charId].skills[skill].total =
      state.characters[charId].skills[skill].points +
      state.characters[charId].attributes[attrModifier].modifier
  })
}

export const characterSlice = createSlice({
  name: 'characters',
  initialState,
  reducers: {
    resetGame: () => initialState,
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

        // update skill dependencies
        const deps =
          state.characters[action.payload.id].attributes[action.payload.attr]
            .dependencies
        incrementSkills(state, action.payload.id, deps, action.payload.attr)
      } else {
        state.ui.errors.maxCharacterAttributesReached = true
      }
    },
    decrementAttribute: (state, action) => {
      if (
        state.characters[action.payload.id].attributes[action.payload.attr]
          .value > 0
      ) {
        state.characters[action.payload.id].attributes[
          action.payload.attr
        ].value -= 1
        state.characters[action.payload.id].attributes[
          action.payload.attr
        ].modifier -= 1

        // update skill dependencies
        const deps =
          state.characters[action.payload.id].attributes[action.payload.attr]
            .dependencies
        decrementSkills(state, action.payload.id, deps, action.payload.attr)
      }
    },
    incrementSkill: (state, action) => {
      if (!isCharacterSkillReached(state.characters[action.payload.id])) {
        const charId = action.payload.id
        const skill = action.payload.skill
        const attrModifier = state.characters[charId].skills[skill].modifier

        incrementSkills(state, charId, [skill], attrModifier)
      } else {
        state.ui.errors.maxSkillsPointsReached = true
      }
    },
    decrementSkill: (state, action) => {
      const charId = action.payload.id
      const skill = action.payload.skill
      const attrModifier = state.characters[charId].skills[skill].modifier

      decrementSkills(state, charId, [skill], attrModifier)
    },
    setClassState: (state, action) => {
      state.characters[action.payload.id].classes[action.payload.class] =
        action.payload.active
    },
    setSkillCheck: (state, action) => {
      state.skillCheck = action.payload
    },
    clearErrors: (state) => {
      state.ui.errors = {
        maxCharacterAttributesReached: false,
        maxSkillsPointsReached: false,
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchGameData.fulfilled, (state, action) => {
      return { ...action.payload.body }
    })
  },
})

export const {
  resetGame,
  addCharacter,
  incrementAttribute,
  decrementAttribute,
  incrementSkill,
  decrementSkill,
  setClassState,
  setSkillCheck,
  clearErrors,
} = characterSlice.actions

export default characterSlice.reducer
