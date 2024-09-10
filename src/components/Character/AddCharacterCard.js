function AddCharacterCard() {
  return (
    <div
      className={
        'flex flex-col border border-dashed border-amber-50 m-3 p-4 rounded-xl w-80 justify-center cursor-pointer'
      }
    >
      <div className={'text-gray-500'}>
        <p className={'text-5xl mb-3'}>+</p>
        <p className={'text-3xl'}>Add Character</p>
      </div>
    </div>
  )
}

export default AddCharacterCard
