function ClassTab({ label, active }) {
  return (
    <div>
      {active ? (
        <div className={'rounded-lg bg-white text-red-700 font-bold py-2 px-4'}>
          {label}
        </div>
      ) : (
        <div className={'rounded-lg py-2 px-4 font-bold'}>{label}</div>
      )}
    </div>
  )
}

export default ClassTab
