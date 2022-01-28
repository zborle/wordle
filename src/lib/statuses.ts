import { getWordOfDay } from './words'

export type CharStatus = 'absent' | 'present' | 'correct'

export type CharValue =
    | 'Љ'
    | 'Њ'
    | 'Е'
    | 'Р'
    | 'Т'
    | 'Ѕ'
    | 'У'
    | 'И'
    | 'О'
    | 'П'
    | 'Ш'
    | 'Ѓ'
    | 'Ж'
    | 'А'
    | 'С'
    | 'Д'
    | 'Ф'
    | 'Г'
    | 'Х'
    | 'Ј'
    | 'К'
    | 'Л'
    | 'Ч'
    | 'Ќ'
    | 'З'
    | 'Џ'
    | 'Ц'
    | 'В'
    | 'Б'
    | 'Н'
    | 'М'

export const getStatuses = (guesses: string[]): { [key: string]: CharStatus } => {
    const charObj: { [key: string]: CharStatus } = {}
    const solution = getWordOfDay()

    guesses.forEach((word) => {
        word.split('').forEach((letter, i) => {
            if (!solution.includes(letter)) {
                // make status absent
                return (charObj[letter] = 'absent')
            }

            if (letter === solution[i]) {
                //make status correct
                return (charObj[letter] = 'correct')
            }

            if (charObj[letter] !== 'correct') {
                //make status present
                return (charObj[letter] = 'present')
            }
        })
    })

    return charObj
}

export const getGuessStatuses = (guess: string): CharStatus[] => {
    const solution = getWordOfDay()
    const splitSolution = solution.split('')
    const splitGuess = guess.split('')

    const solutionCharsTaken = splitSolution.map((_) => false)

    const statuses: CharStatus[] = Array.from(Array(guess.length))

    // handle all correct cases first
    splitGuess.forEach((letter, i) => {
        if (letter === splitSolution[i]) {
            statuses[i] = 'correct'
            solutionCharsTaken[i] = true
            return
        }
    })

    splitGuess.forEach((letter, i) => {
        if (statuses[i]) return

        if (!splitSolution.includes(letter)) {
            // handles the absent case
            statuses[i] = 'absent'
            return
        }

        // now we are left with "present"s
        const indexOfPresentChar = splitSolution.findIndex((x, index) => x === letter && !solutionCharsTaken[index])

        if (indexOfPresentChar > -1) {
            statuses[i] = 'present'
            solutionCharsTaken[indexOfPresentChar] = true
            return
        } else {
            statuses[i] = 'absent'
            return
        }
    })

    return statuses
}
