import { createSlice } from '@reduxjs/toolkit'
import { ATTRIBUTE_LIST, CLASS_LIST, SKILL_LIST } from '../consts'
import {
  isCharacterLimitReached,
  isCharacterSkillReached,
} from '../utils/utils'

const getDependencies = (attribute) => {
  const deps = []
  SKILL_LIST.forEach((item) => {
    if (item.attributeModifier === attribute) {
      deps.push(item.name)
    }
  })
  return deps
}

const generateNewCharacter = () => {
  return {
    attributes: ATTRIBUTE_LIST.reduce((obj, item) => {
      return {
        ...obj,
        [item]: {
          value: 10,
          modifier: 0,
          dependencies: getDependencies(item),
        },
      }
    }, {}),
    classes: Object.keys(CLASS_LIST).reduce((obj, item) => {
      return { ...obj, [item]: false }
    }, {}),
    skills: SKILL_LIST.reduce((obj, item) => {
      return {
        ...obj,
        [item.name]: {
          points: 0,
          total: 0,
          modifier: item.attributeModifier,
        },
      }
    }, {}),
  }
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
})

export const {
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
