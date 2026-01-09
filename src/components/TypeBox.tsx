import type { CharacterState } from '../lib/types.ts'
import CharacterItem from './CharacterItem'

type Props = {
  text: string
  userInput: string
  current: number
}

export default function TypeBox({ text, userInput, current }: Props) {
  return (
    <div className="type-box mt-4 min-h-[300px] w-full border-none leading-[1.35] tracking-[.4px] text-white">
      {text.split('').map((char, index) => {
        let state: CharacterState = 'EMPTY'
        if (index < userInput.length) {
          state = userInput[index] === char ? 'FILLED' : 'ERROR'
        }
        return (
          <CharacterItem
            key={index}
            index={index}
            value={char}
            state={state}
            isCurrent={index === current}
          />
        )
      })}
    </div>
  )
}
