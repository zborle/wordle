import { SunIcon, MoonIcon } from '@heroicons/react/24/outline'
import { useTheme } from '../../contexts/ThemeContext'

export const ThemeToggle = () => {
    const { theme, toggleTheme } = useTheme()

    return (
        <button
            onClick={toggleTheme}
            className="p-2 rounded-lg transition-colors duration-200 hover:bg-slate-200 dark:hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-400"
            aria-label={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
            title={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
        >
            {theme === 'light' ? (
                <MoonIcon className="w-6 h-6 text-slate-700" />
            ) : (
                <SunIcon className="w-6 h-6 text-yellow-400" />
            )}
        </button>
    )
}
