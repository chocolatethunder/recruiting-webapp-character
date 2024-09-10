import { useEffect } from 'react'
import { setClassState } from '../../state/characterSlice'
import { useDispatch } from 'react-redux'

function ClassTab({ charId, label, active }) {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(setClassState({ id: charId, class: label, active: active }))
  }, [active])

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
