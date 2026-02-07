import { useRef, useEffect } from 'react'

export default function useScroll(input: string, padding: number) {
  const container = useRef<HTMLDivElement>(null)
  const element = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    if (!element.current || !container.current) return

    const top = element.current.offsetTop

    container.current.scrollTo({
      top: top - padding,
      behavior: 'smooth',
    })
  }, [input.length, padding])

  return { container, element }
}
