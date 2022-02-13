const gameStateKey = 'gameState'

type StoredGameState = {
    guesses: string[]
    solutionIndex: number
}

export const saveGameStateToLocalStorage = (gameState: StoredGameState) => {
    localStorage.setItem(gameStateKey, JSON.stringify(gameState))
}

export const loadGameStateFromLocalStorage = () => {
    const state = localStorage.getItem(gameStateKey)
    return state ? (JSON.parse(state) as StoredGameState) : null
}

const gameStatKey = 'gameStats'

export type GameStats = {
    winDistribution: number[]
    gamesFailed: number
    currentStreak: number
    bestStreak: number
    totalGames: number
    successRate: number
}

export const saveStatsToLocalStorage = (gameStats: GameStats) => {
    localStorage.setItem(gameStatKey, JSON.stringify(gameStats))
}

export const loadStatsFromLocalStorage = () => {
    const stats = localStorage.getItem(gameStatKey)
    return stats ? (JSON.parse(stats) as GameStats) : null
}

export const saveDarkThemeToLocalStorage = (status: any) => {
    localStorage.setItem('dark-theme', status);
}

export const loadDarkThemeFromLocalStorage = () => {
    const theme = localStorage.getItem('dark-theme');
    if(theme) return theme;
    else return null;
}
