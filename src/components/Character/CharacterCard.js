import { ATTRIBUTE_LIST, CLASS_LIST, SKILL_LIST } from '../../consts'
import AttributesRow from './AttributesRow'
import SkillsRow from './SkillsRow'

function CharacterCard({ id }) {
  return (
    <div
      className={
        'flex flex-col border border-amber-50 m-3 p-4 rounded-xl w-100'
      }
    >
      <div className={'text-2xl mt-1 mb-2 font-bold'}>Character {id}</div>
      <div className={'text-xl mb-3 font-bold'}>Attributes</div>
      <div className={'flex flex-col pb-4 border-b-2'}>
        {ATTRIBUTE_LIST.map((attr) => {
          return (
            <AttributesRow
              charId={id}
              attribute={attr}
              value={0}
              modifier={0}
            />
          )
        })}
      </div>
      <div className={'flex p-4 border-b-2 justify-evenly'}>
        {Object.keys(CLASS_LIST).map((className) => {
          return <div>{className}</div>
        })}
      </div>
      <div className={'flex flex-col pt-4'}>
        {SKILL_LIST.map((skill) => {
          return (
            <SkillsRow
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
