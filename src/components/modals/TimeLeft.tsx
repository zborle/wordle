import { formatTime, Time } from '../../lib/words'

type Props = {
    timeLeft: Time
}

export const TimeLeft = ({ timeLeft }: Props) => {
    const { hours, minutes, seconds } = timeLeft
    return (
        <div className="my-2 text-center">
            <h4 className="text-gray-900 dark:text-gray-100">До следно ЗБОРЛЕ</h4>
            <p className="text-3xl text-gray-900 dark:text-gray-100">
                {hours}:{formatTime(minutes)}:{formatTime(seconds)}
            </p>
        </div>
    )
}
