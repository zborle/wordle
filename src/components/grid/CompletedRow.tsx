import { getGuessStatuses } from '../../lib/statuses'
import { Cell } from './Cell'

type Props = {
    guess: string
    win?: boolean
}

export const CompletedRow = ({ guess, win = false }: Props) => {
    const statuses = getGuessStatuses(guess)
    return (
      <div className="flex justify-center mb-1">
          {guess.split('').map((letter, i) => (
            <Cell key={i} value={letter} status={statuses[i]} completed={true} delay={i * 150} win={win} />
          ))}
      </div>
    )
}
