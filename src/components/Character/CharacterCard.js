import { ATTRIBUTE_LIST, SKILL_LIST } from '../../consts'
import AttributesRow from './AttributesRow'
import SkillsRow from './SkillsRow'
import { useDispatch, useSelector } from 'react-redux'
import ClassTab from './ClassTab'
import { useEffect, useState } from 'react'
import { getCharacterClasses, randomDiceRoller } from '../../utils/utils'
import { setSkillCheck } from '../../state/characterSlice'

function CharacterCard({ id }) {
  const characters = useSelector((state) => state.characters.characters)
  const dispatch = useDispatch()

  const characterData = characters[id]

  const [characterClasses, setCharacterClasses] = useState([])
  const [skillSelected, setSkillSelected] = useState(SKILL_LIST[0].name)
  const [dc, setDcValue] = useState(0)

  useEffect(() => {
    setCharacterClasses(getCharacterClasses(characterData))
  }, [characterData])

  const rollDice = () => {
    const rolled = randomDiceRoller()
    dispatch(
      setSkillCheck({
        character: id + 1,
        skill: skillSelected,
        skillValue: characterData.skills[skillSelected].total,
        rolled: rolled,
        dc: dc,
        result: dc <= characterData.skills[skillSelected].total + rolled,
      })
    )
  }

  return (
    <div
      className={
        'flex flex-col border border-amber-50 m-3 p-4 rounded-xl w-[600px]'
      }
    >
      <div className={'text-2xl mt-1 mb-6 font-bold'}>Character {id + 1}</div>

      <div className={'flex flex-col pb-4 mb-3 border-b-2'}>
        <div className={'text-xl font-bold mb-3'}>Skill Check</div>
        <div className={'flex gap-2'}>
          <select
            onChange={(e) => setSkillSelected(e.target.value)}
            className={'w-1/2 text-black p-1'}
          >
            {SKILL_LIST.map((entry) => {
              return (
                <option key={entry.name.toLowerCase()}>{entry.name}</option>
              )
            })}
          </select>
          <input
            className={'w-1/3 text-black px-2 '}
            type={'number'}
            value={dc}
            onChange={(e) => setDcValue(parseInt(e.target.value))}
          />
          <button
            onClick={rollDice}
            className={'w-1/3 border rounded-md font-bold'}
          >
            Roll
          </button>
        </div>
      </div>

      <div className={'text-xl mb-3 font-bold'}>Attributes</div>
      <div className={'flex flex-col pb-4 border-b-2'}>
        {ATTRIBUTE_LIST.map((attr, idx) => {
          return (
            <AttributesRow
              key={'id-' + idx}
              charId={id}
              attribute={attr}
              value={characterData.attributes[attr].value}
              modifier={characterData.attributes[attr].modifier}
            />
          )
        })}
      </div>
      <div className={'flex p-4 border-b-2 mb-3 justify-evenly'}>
        {Object.entries(characterData.classes).map(([key, value], idx) => {
          return (
            <ClassTab
              key={'id-' + idx}
              charId={id}
              label={key}
              active={characterClasses.includes(key)}
            />
          )
        })}
      </div>
      <div>
        Skill points available:{' '}
        {10 + 4 * characterData.attributes['Intelligence'].modifier}
      </div>
      <div className={'flex flex-col pt-4'}>
        {SKILL_LIST.map((skill, idx) => {
          return (
            <SkillsRow
              key={'id-' + idx}
              charId={id}
              skill={skill.name}
              value={characterData.skills[skill.name].points}
              total={characterData.skills[skill.name].total}
              attrModifierLabel={skill.attributeModifier}
              attrModifierValue={
                characterData.attributes[skill.attributeModifier].modifier
              }
            />
          )
        })}
      </div>
    </div>
  )
}

export default CharacterCard
