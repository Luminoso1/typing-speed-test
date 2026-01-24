import { useEffect, useCallback } from 'react'
import { ALLOWED_KEYS } from '../lib/constants'
import type { Action } from '../store/reducer'

const isKeyAllowed = (key: string) => ALLOWED_KEYS.includes(key)

export default function useType(dispatch: React.Dispatch<Action>) {
  const handleKeyDown = useCallback(
    (key: string) => {
      if (!isKeyAllowed(key)) return


      dispatch({ type: 'SET_INPUT', payload: key })
    },
    [dispatch],
  )

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => handleKeyDown(event.key)
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [handleKeyDown])
}
