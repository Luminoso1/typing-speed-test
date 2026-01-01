import { getRandomTextCharacters } from '../lib/helpers'
import type { CharacterState } from '../lib/types.ts'
import { useType } from '../hooks/useType'
import CharacterItem from './CharacterItem'

const text = getRandomTextCharacters('easy')

export default function TypeBox() {
  const { userInput, current } = useType(text)
  return (
    <div className="type-box">
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
