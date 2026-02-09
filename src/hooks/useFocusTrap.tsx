import { useEffect, useRef } from 'react'

type Focusable =
  | HTMLButtonElement
  | HTMLAnchorElement
  | HTMLInputElement
  | HTMLSelectElement
  | HTMLTextAreaElement

export default function useFocusTrap(isOpen: boolean) {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const previousFocus = useRef<HTMLElement | null>(null)

  useEffect(() => {
    // restore previous focus after close
    if (!isOpen) {
      previousFocus.current?.focus()
      return
    }

    // save active element  as previous focus
    previousFocus.current = document.activeElement as HTMLElement

    if (!containerRef.current) return

    const focusables: NodeListOf<Focusable> =
      containerRef.current.querySelectorAll(
        'button, [tabindex]:not([tabindex="-1"])',
      )

    const first = focusables[0]
    const last = focusables[focusables.length - 1]

    // auto-focus frist element within container
    if (first) first.focus()

    const handleTab = (event: KeyboardEvent) => {
      if (event.key !== 'Tab') return
      if (event.shiftKey) {
        if (document.activeElement === first) {
          last.focus()
          event.preventDefault()
        }
      } else {
        if (document.activeElement === last) {
          first.focus()
          event.preventDefault()
        }
      }
    }

    document.addEventListener('keydown', handleTab)

    return () => {
      document.removeEventListener('keydown', handleTab)
    }
  }, [isOpen])

  return containerRef
}
