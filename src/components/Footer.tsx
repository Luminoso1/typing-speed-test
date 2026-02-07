import { memo } from 'react'
import Button from './Button'
import { Restart, Next } from './Icons'
import { useConfig, useActions } from '../store/context'

const Footer = memo(function Footer() {
  const { status } = useConfig()
  const { next, restart } = useActions()
  return (
    <div className="flex w-full flex-col gap-x-3 gap-y-5 sm:flex-row sm:justify-center">
      {status === 'TYPING' && (
        <div className="animate-fade-in-up animate-duration-300">
          <Button icon aria-label="Restart Test" onClick={restart}>
            <Restart className="size-7" />
            <span className="md:hidden">Restart Test</span>
          </Button>
        </div>
      )}

      <Button icon aria-label="Next Test" onClick={next}>
        <Next className="size-7" />
        <span className="leading-none md:hidden">Next Text</span>
      </Button>
    </div>
  )
})

export default Footer
