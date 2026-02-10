import { useEffect, useRef } from 'react'

/*
 * Query only button & radios checked.
 * Beacause radios only focus `Tab` checked ones.
 * If the last one isn't checked -> focus leaves containerRef.
 *
 * */

const focusableSelector = 'button, input[type="radio"]:checked'

export default function useFocusTrap(isOpen: boolean) {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const previousFocus = useRef<HTMLElement | null>(null)

  useEffect(() => {
    // restore previous focus after close
    if (!isOpen) {
      requestAnimationFrame(() => {
        previousFocus.current?.focus()
      })
      return
    }

    // save active element  as previous focus
    previousFocus.current = document.activeElement as HTMLElement

    const handleTab = (event: KeyboardEvent) => {
      if (event.key !== 'Tab' || !containerRef.current) return

      const focusableElements =
        containerRef.current.querySelectorAll<HTMLElement>(focusableSelector)

      if (focusableElements.length === 0) {
        event.preventDefault()
      }

      const first = focusableElements[0]
      const last = focusableElements[focusableElements.length - 1]
      const activeElement = document.activeElement as HTMLElement

      if (event.shiftKey && activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && activeElement == last) {
        event.preventDefault()
        first.focus()
      }
    }
    const initialFocus = () => {
      const focusable =
        containerRef.current?.querySelectorAll<HTMLElement>(
          focusableSelector,
        )[0]
      focusable?.focus()
    }

    requestAnimationFrame(() => {
      initialFocus()
    })

    document.addEventListener('keydown', handleTab)

    return () => {
      document.removeEventListener('keydown', handleTab)
    }
  }, [isOpen])

  return containerRef
}
