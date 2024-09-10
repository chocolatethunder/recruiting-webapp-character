import { ATTRIBUTE_LIST, CLASS_LIST, SKILL_LIST } from '../../consts'
import AttributesRow from './AttributesRow'
import SkillsRow from './SkillsRow'
import { useSelector } from 'react-redux'
import ClassTab from './ClassTab'

function CharacterCard({ id }) {
  const characters = useSelector((state) => state.characters.characters)

  const characterData = characters[id]

  return (
    <div
      className={
        'flex flex-col border border-amber-50 m-3 p-4 rounded-xl w-100'
      }
    >
      <div className={'text-2xl mt-1 mb-2 font-bold'}>Character {id + 1}</div>
      <div className={'text-xl mb-3 font-bold'}>Attributes</div>
      <div className={'flex flex-col pb-4 border-b-2'}>
        {ATTRIBUTE_LIST.map((attr, idx) => {
          return (
            <AttributesRow
              key={'id-' + idx}
              charId={id}
              attribute={attr}
              value={characterData[attr]}
              modifier={0}
            />
          )
        })}
      </div>
      <div className={'flex p-4 border-b-2 justify-evenly'}>
        {Object.entries(characterData.classes).map(([key, value], idx) => {
          return <ClassTab key={'id-' + idx} label={key} active={value} />
        })}
      </div>
      <div className={'flex flex-col pt-4'}>
        {SKILL_LIST.map((skill, idx) => {
          return (
            <SkillsRow
              key={'id-' + idx}
              charId={id}
              skill={skill.name}
              value={0}
              attrModifier={skill.attributeModifier}
            />
          )
        })}
      </div>
    </div>
  )
}

export default CharacterCard
