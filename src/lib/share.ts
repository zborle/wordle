import { getGuessStatuses } from './statuses'
import { getWordOfDayIndex } from './words'

export const shareStatus = (guesses: string[]) => {
    navigator.clipboard.writeText(
        `Зборле ${getWordOfDayIndex()} ${guesses.length}/6\n\n${generateEmojiGrid(
            guesses,
        )}\n\nИграјте ЗБОРЛЕ https://zborle.mk`,
    )
}

export const generateEmojiGrid = (guesses: string[]) => {
    return guesses
        .map((guess) => {
            const status = getGuessStatuses(guess)
            return guess
                .split('')
                .map((_, i) => {
                    switch (status[i]) {
                        case 'correct':
                            return '🟩'
                        case 'present':
                            return '🟨'
                        default:
                            return '⬜'
                    }
                })
                .join('')
        })
        .join('\n')
}
