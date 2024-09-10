function SkillCheckResult() {
  return (
    <div
      className={'border border-amber-50 m-3 p-4 rounded-xl w-60 self-center'}
    >
      <div className={'text-xl mt-1 mb-6 font-bold'}>Skill Check Results</div>
      <div className={'flex flex-col'}>
        <div className={'flex flex-row'}>
          <div className={'flex flex-grow'}>Skill: Animal Handling:</div>
          <div className={'w-1/6 flex justify-end'}>6</div>
        </div>
        <div className={'flex'}>
          <div className={'flex flex-grow'}>You rolled:</div>
          <div className={'w-1/6 flex justify-end'}>3</div>
        </div>
        <div className={'flex'}>
          <div className={'flex flex-grow'}>The DC was:</div>
          <div className={'w-1/6 flex justify-end'}>20</div>
        </div>
        <div className={'flex'}>
          <div className={'flex flex-grow'}>Result:</div>
          <div className={'w-1/6 flex justify-end'}>Failure</div>
        </div>
      </div>
    </div>
  )
}

export default SkillCheckResult
