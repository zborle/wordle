import { GameStats } from '../../lib/localStorage'

type Props = {
    gameStats: GameStats
}

const StatItem = ({ label, value }: { label: string; value: string | number }) => {
    return (
        <div className="items-center justify-center m-1 w-1/4">
            <div className="text-3xl text-gray-900 dark:text-gray-100">{value}</div>
            <div className="text-xs text-gray-500 dark:text-gray-400">{label}</div>
        </div>
    )
}

export const StatBar = ({ gameStats }: Props) => {
    return (
        <div className="flex justify-center my-2">
            <StatItem label="Вкупно обиди" value={gameStats.totalGames} />
            <StatItem label="Успешност" value={`${gameStats.successRate}%`} />
            <StatItem label="Моментална низа" value={gameStats.currentStreak} />
            <StatItem label="Најдобра низа" value={gameStats.bestStreak} />
        </div>
    )
}
