import { useState, useCallback, useRef } from 'react'

export function useToast(duration = 2200) {
  const [message, setMessage] = useState('')
  const [visible, setVisible] = useState(false)
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined)

  const show = useCallback(
    (msg: string) => {
      setMessage(msg)
      setVisible(true)
      clearTimeout(timer.current)
      timer.current = setTimeout(() => setVisible(false), duration)
    },
    [duration],
  )

  return { message, visible, show }
}
