function SkillsRow({ charId, skill, value, attrModifier }) {
  return (
    <div className={'flex gap-2 mb-1'}>
      <div className={'flex'}>{skill}:</div>
      <div className={'flex flex-grow justify-end'}>{value}</div>
      <div className={'flex'}>
        <span className={'text-gray-400 mr-1'}>Modifier:</span>
        {attrModifier}
      </div>
      <button className={'w-[21px] h-[24px] p-0 ml-3 bg-amber-50 text-black'}>
        +
      </button>
      <button className={'w-[21px] h-[24px] p-0 bg-amber-50 text-black'}>
        -
      </button>
    </div>
  )
}

export default SkillsRow
