import { ChartBarIcon, InformationCircleIcon, QuestionMarkCircleIcon } from '@heroicons/react/24/outline'
import { useEffect, useState } from 'react'
import { Alert } from './components/alerts/Alert'
import { Grid } from './components/grid/Grid'
import { Keyboard } from './components/keyboard/Keyboard'
import { AboutModal } from './components/modals/AboutModal'
import { InfoModal } from './components/modals/InfoModal'
import { WinModal } from './components/modals/WinModal'
import { ShortcutsModal } from './components/modals/ShortcutsModal'
import { getTimeUntilNextWord, getWordOfDay, getWordOfDayIndex, isWinningWord, isWordInWordList } from './lib/words'
import { loadGameStateFromLocalStorage, saveGameStateToLocalStorage } from './lib/localStorage'
import { convert, LETTERS_EN } from './lib/keyboard'
import { addStatsForCompletedGame, loadStats } from './lib/stats'
import { StatsModal } from './components/modals/StatsModals'
import { ThemeToggle } from './components/ui/ThemeToggle'
import { SoundToggle } from './components/ui/SoundToggle'
import { useSound } from './contexts/SoundContext'

function App() {
    const { playSound } = useSound()
    const [currentGuess, setCurrentGuess] = useState('')
    const [isGameWon, setIsGameWon] = useState(false)
    const [isWinModalOpen, setIsWinModalOpen] = useState(false)
    const [isWinAnimationStarted, setIsWinAnimationStarted] = useState(false)
    const [isInfoModalOpen, setIsInfoModalOpen] = useState(false)
    const [isAboutModalOpen, setIsAboutModalOpen] = useState(false)
    const [isShortcutsModalOpen, setIsShortcutsModalOpen] = useState(false)
    const [isNotEnoughLetters, setIsNotEnoughLetters] = useState(false)
    const [isStatsModalOpen, setIsStatsModalOpen] = useState(false)
    const [isWordNotFoundAlertOpen, setIsWordNotFoundAlertOpen] = useState(false)
    const [isGameLost, setIsGameLost] = useState(false)
    const [shareComplete, setShareComplete] = useState(false)
    const [timeUntilNextWord, setTimeUntilNextWord] = useState(getTimeUntilNextWord())
    const [guesses, setGuesses] = useState<string[]>(() => {
        const loaded = loadGameStateFromLocalStorage()
        if (loaded == null) {
            setIsInfoModalOpen(true)
        }
        if (loaded?.solutionIndex !== getWordOfDayIndex()) {
            return []
        }
        if (loaded.guesses.includes(getWordOfDay())) {
            setIsGameWon(true)
        }
        return loaded.guesses
    })

    const [stats, setStats] = useState(() => loadStats())

    useEffect(() => {
        const state = loadGameStateFromLocalStorage()
        if (!state || state?.solutionIndex === timeUntilNextWord.solutionIndex) {
            if (isWinModalOpen) {
                const timer = setTimeout(() => {
                    setTimeUntilNextWord(getTimeUntilNextWord())
                }, 1000)
                return () => clearTimeout(timer)
            }
        } else {
            setIsGameWon(false)
            setGuesses([])
        }
    }, [timeUntilNextWord, isWinModalOpen])

    useEffect(() => {
        saveGameStateToLocalStorage({
            guesses,
            solutionIndex: getWordOfDayIndex(),
        })
    }, [guesses])

    useEffect(() => {
        const timeout = setTimeout(() => setIsWinModalOpen(isGameWon), 2500)
        return () => clearTimeout(timeout)
    }, [isGameWon])

    useEffect(() => {
        const timeout = setTimeout(() => setIsWinAnimationStarted(isGameWon), 150 * 5 + 250)
        return () => clearTimeout(timeout)
    }, [isGameWon])

    const onChar = (value: string) => {
        if (isGameWon) {
            return
        }
        let converted = value
        if (LETTERS_EN.includes(value)) {
            converted = convert(value)
        }
        if (currentGuess.length < 5 && guesses.length < 6) {
            setCurrentGuess(`${currentGuess}${converted}`)
            playSound('keypress')
        }
    }

    const onDelete = () => {
        setCurrentGuess(currentGuess.slice(0, -1))
        playSound('delete')
    }

    const onEnter = () => {
        if (isGameWon) {
            return
        }
        if (currentGuess.length !== 5) {
            setIsNotEnoughLetters(true)
            playSound('invalid')
            return setTimeout(() => {
                setIsNotEnoughLetters(false)
            }, 2000)
        }

        if (!isWordInWordList(currentGuess)) {
            setIsWordNotFoundAlertOpen(true)
            playSound('invalid')
            return setTimeout(() => {
                setIsWordNotFoundAlertOpen(false)
            }, 2000)
        }

        const winningWord = isWinningWord(currentGuess)

        if (currentGuess.length === 5 && guesses.length < 6 && !isGameWon) {
            setGuesses([...guesses, currentGuess])
            setCurrentGuess('')
            playSound('enter')

            if (winningWord) {
                setStats(addStatsForCompletedGame(stats, guesses.length))
                setTimeout(() => playSound('win'), 500)
                return setIsGameWon(true)
            }

            if (guesses.length === 5) {
                setStats(addStatsForCompletedGame(stats, guesses.length + 1))
                setIsGameLost(true)
                setTimeout(() => playSound('lose'), 500)
                return setTimeout(() => {
                    setIsGameLost(false)
                }, 5000)
            }
        }
    }

    // Keyboard shortcuts
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === '?' && !e.ctrlKey && !e.metaKey && !e.altKey) {
                e.preventDefault()
                setIsShortcutsModalOpen(true)
            }
        }
        window.addEventListener('keydown', handleKeyDown)
        return () => window.removeEventListener('keydown', handleKeyDown)
    }, [])

    return (
        <div className="min-h-screen bg-white dark:bg-slate-900 transition-colors duration-300">
            <div className="py-8 max-w-7xl mx-auto sm:px-6 lg:px-8">
                <Alert message="Немате внесено доволно букви" isOpen={isNotEnoughLetters} variant="error" />
                <Alert
                    message="Зборот не е пронајден во речникот на Зборле"
                    isOpen={isWordNotFoundAlertOpen}
                    variant="error"
                />
                <Alert message={`Изгубивте, бараниот збор е ${getWordOfDay()}`} isOpen={isGameLost} variant="error" />
                <Alert message="Копирано во clipboard за споделување" isOpen={shareComplete} variant="success" />

                {/* Header - Title left, buttons right */}
                <header className="flex items-center justify-between mb-2 mx-auto w-[300px]">
                    {/* Left: Title */}
                    <h1 className="text-3xl text-slate-800 dark:text-slate-100 tracking-wider uppercase font-bold">
                        Зборле
                    </h1>

                    {/* Right: Buttons group */}
                    <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 rounded-xl px-2 py-1.5">
                        <button
                            onClick={() => setIsInfoModalOpen(true)}
                            className="p-2 rounded-lg transition-all duration-200 hover:bg-slate-200 dark:hover:bg-slate-700 hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-slate-400"
                            aria-label="Како се игра"
                            title="Помош"
                        >
                            <QuestionMarkCircleIcon className="h-5 w-5 text-slate-600 dark:text-slate-400" />
                        </button>
                        <div className="w-px h-4 bg-slate-300 dark:bg-slate-600" />
                        <button
                            onClick={() => setIsStatsModalOpen(true)}
                            className="p-2 rounded-lg transition-all duration-200 hover:bg-slate-200 dark:hover:bg-slate-700 hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-slate-400"
                            aria-label="Статистика"
                            title="Статистика"
                        >
                            <ChartBarIcon className="h-5 w-5 text-slate-600 dark:text-slate-400" />
                        </button>
                    </div>
                </header>

                <Grid
                    guesses={guesses}
                    currentGuess={currentGuess}
                    invalid={isNotEnoughLetters || isWordNotFoundAlertOpen}
                    win={isWinAnimationStarted}
                />
                <Keyboard onChar={onChar} onDelete={onDelete} onEnter={onEnter} guesses={guesses} />
                <WinModal
                    isOpen={isWinModalOpen}
                    handleClose={() => setIsWinModalOpen(false)}
                    guesses={guesses}
                    handleShare={() => {
                        setIsWinModalOpen(false)
                        setShareComplete(true)
                        return setTimeout(() => {
                            setShareComplete(false)
                        }, 2000)
                    }}
                    timeLeft={timeUntilNextWord}
                />
                <InfoModal isOpen={isInfoModalOpen} handleClose={() => setIsInfoModalOpen(false)} />
                <StatsModal
                    isOpen={isStatsModalOpen}
                    handleClose={() => setIsStatsModalOpen(false)}
                    gameStats={stats}
                />
                <AboutModal isOpen={isAboutModalOpen} handleClose={() => setIsAboutModalOpen(false)} />
                <ShortcutsModal isOpen={isShortcutsModalOpen} handleClose={() => setIsShortcutsModalOpen(false)} />

                {/* Footer with Settings */}
                <footer className="mt-8 flex items-center justify-center">
                    <div className="flex items-center gap-1 px-3 py-2 bg-slate-100 dark:bg-slate-800 rounded-xl">
                        <SoundToggle />
                        <div className="w-px h-5 bg-slate-300 dark:bg-slate-600 mx-1" />
                        <ThemeToggle />
                        <div className="w-px h-5 bg-slate-300 dark:bg-slate-600 mx-1" />
                        <button
                            type="button"
                            className="p-2 rounded-lg transition-all duration-200 hover:bg-slate-200 dark:hover:bg-slate-700 hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-slate-400"
                            onClick={() => setIsAboutModalOpen(true)}
                            aria-label="За играта"
                            title="За играта"
                        >
                            <InformationCircleIcon className="h-6 w-6 text-slate-700 dark:text-slate-300" />
                        </button>
                    </div>
                </footer>
            </div>
        </div>
    )
}

export default App
