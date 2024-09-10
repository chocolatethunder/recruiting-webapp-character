import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { DELEGATED_POINT_MAX } from '../consts'
import { clearErrors } from '../state/characterSlice'

function WarningModal() {
  const errors = useSelector((state) => state.characters.ui.errors)
  const dispatch = useDispatch()

  const [visible, setIsVisible] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    if (errors.maxCharacterAttributesReached) {
      setErrorMessage(
        `A Character can have up to ${DELEGATED_POINT_MAX} Delegated Attribute Points`
      )
      setIsVisible(true)
    }
  }, [errors])

  return (
    <>
      {visible && (
        <div
          onClick={() => {
            dispatch(clearErrors())
            setIsVisible(false)
          }}
          className={
            'fixed left-[50%] translate-x-[-50%] p-4 font-bold bottom-10 rounded-lg bg-amber-600 text-white cursor-pointer'
          }
        >
          {errorMessage}
        </div>
      )}
    </>
  )
}

export default WarningModal
