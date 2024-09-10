import { useDispatch } from 'react-redux'
import { decrementSkill, incrementSkill } from '../../state/characterSlice'

function SkillsRow({
  charId,
  skill,
  value,
  total,
  attrModifierLabel,
  attrModifierValue,
}) {
  const dispatch = useDispatch()

  const addSkill = () => {
    dispatch(incrementSkill({ id: charId, skill: skill }))
  }

  const subtractSkill = () => {
    dispatch(decrementSkill({ id: charId, skill: skill }))
  }

  return (
    <div className={'flex gap-1 mb-1'}>
      <div className={'flex w-[150px]'}>{skill}:</div>
      <div className={'w-[50px] p-0'}>{value}</div>
      <div className={'flex w-[200px]'}>
        <span className={'text-gray-400 mr-1'}>Modifier:</span>
        {attrModifierLabel} ({attrModifierValue})
      </div>
      <div className={'flex justify-end w-[60px] gap-2 mr-3'}>
        <button
          onClick={subtractSkill}
          className={'w-[21px] h-[24px] p-0 ml-2 bg-amber-50 text-black'}
        >
          -
        </button>
        <button
          onClick={addSkill}
          className={'w-[21px] h-[24px] p-0 bg-amber-50 text-black'}
        >
          +
        </button>
      </div>

      <div className={'flex'}>
        <span className={'text-gray-400 mr-1'}>Total:</span>
        {total}
      </div>
    </div>
  )
}

export default SkillsRow
