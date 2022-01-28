import { CompletedRow } from './CompletedRow'
import { CurrentRow } from './CurrentRow'
import { EmptyRow } from './EmptyRow'

type Props = {
    guesses: string[]
    currentGuess: string
    invalid?: boolean
    win?: boolean
}

export const Grid = ({ guesses, currentGuess, invalid = false, win = false }: Props) => {
    const empties =
      guesses.length < 5 ? Array.from(Array(5 - guesses.length)) : []

    return (
      <div className="pb-6">
          {guesses.map((guess, i) => (
            <CompletedRow key={i} guess={guess} win={win && i === guesses.length - 1} />
          ))}
          {guesses.length < 6 && <CurrentRow guess={currentGuess} invalid={invalid} win={win} />}
          {empties.map((_, i) => (
            <EmptyRow key={i} />
          ))}
      </div>
    )
}
