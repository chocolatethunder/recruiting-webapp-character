function AttributesRow({ charId, attribute, value, modifier }) {
  return (
    <div className={'flex gap-2 mb-1'}>
      <div className={'flex w-1/4'}>{attribute}:</div>
      <div className={'flex flex-grow justify-end'}>{value}</div>
      <div className={'flex w-1/4'}>
        <span className={'text-gray-400 mr-1'}>Modifier:</span>
        {modifier}
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

export default AttributesRow
