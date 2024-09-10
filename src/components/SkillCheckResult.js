import { useSelector } from 'react-redux'

function SkillCheckResult() {
  const skillCheck = useSelector((state) => state.characters.skillCheck)

  return (
    <div
      className={
        'mx-3 bottom-0 bg-[#282c34] border border-amber-50 my-3 p-4 rounded-xl w-[400px]'
      }
    >
      <div className={'text-xl mt-1 mb-2 font-bold'}>Skill Check Results</div>
      <div className={'text-lg mt-1 mb-4 font-bold'}>
        Character: {skillCheck.character}
      </div>
      <div className={'flex flex-col'}>
        <div className={'flex flex-row'}>
          <div className={'flex flex-grow'}>Skill: {skillCheck.skill}:</div>
          <div className={'w-1/6 flex justify-end'}>
            {skillCheck.skillValue}
          </div>
        </div>
        <div className={'flex'}>
          <div className={'flex flex-grow'}>You rolled:</div>
          <div className={'w-1/6 flex justify-end'}>{skillCheck.rolled}</div>
        </div>
        <div className={'flex'}>
          <div className={'flex flex-grow'}>The DC was:</div>
          <div className={'w-1/6 flex justify-end'}>{skillCheck.dc}</div>
        </div>
        <div className={'flex'}>
          <div className={'flex flex-grow'}>Result:</div>
          <div className={'w-1/6 flex justify-end'}>
            {skillCheck.result ? 'Success' : 'Failure'}
          </div>
        </div>
      </div>
    </div>
  )
}

export default SkillCheckResult
