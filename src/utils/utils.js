import { ATTRIBUTE_LIST, CLASS_LIST, DELEGATED_POINT_MAX } from '../consts'

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

  Object.keys(CLASS_LIST).map((className) => {
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
