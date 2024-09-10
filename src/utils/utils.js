import {
  ATTRIBUTE_LIST,
  CLASS_LIST,
  DELEGATED_POINT_MAX,
  SKILL_LIST,
} from '../consts'

export function isCharacterLimitReached(character) {
  return (
    Object.values(character.attributes).reduce((acc, property) => {
      return acc + property.value
    }, 0) >= DELEGATED_POINT_MAX
  )
}

export function isCharacterSkillReached(character) {
  return (
    Object.values(character.skills).reduce((acc, property) => {
      return acc + property.total
    }, 0) >=
    10 + 4 * character.attributes['Intelligence'].modifier
  )
}

export function getCharacterClasses(character) {
  const classes = []

  Object.keys(CLASS_LIST).forEach((className) => {
    const classTest =
      Object.entries(character.attributes)
        .map(([attribute, property]) => {
          return property.value >= CLASS_LIST[className][attribute]
        })
        .filter((value) => value === true).length === ATTRIBUTE_LIST.length

    if (classTest) {
      classes.push(className)
    }
  })
  return classes
}

export function randomDiceRoller() {
  return Math.floor(Math.random() * 21)
}

export function getDependencies(attribute) {
  const deps = []
  SKILL_LIST.forEach((item) => {
    if (item.attributeModifier === attribute) {
      deps.push(item.name)
    }
  })
  return deps
}

export function generateNewCharacter() {
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
