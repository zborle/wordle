import { CharStatus } from '../../lib/statuses'
import classnames from 'classnames'
import { useEffect, useState } from 'react'

type Props = {
    value?: string
    status?: CharStatus
    completed?: boolean
    delay?: number
    invalid?: boolean
    win?: boolean
}

enum AnimationState {
    Idle = 'idle',
    FlipIn = 'flip-in',
    FlipOut = 'flip-out',
    Win = 'win',
}

export const Cell = ({ value, status, completed = false, delay = 0, invalid = false, win = false }: Props) => {
    const [animationState, setAnimationState] = useState(AnimationState.Idle)
    const showColor = animationState === AnimationState.FlipOut || animationState === AnimationState.Win

    let classes = classnames(
        'w-14 h-14 border-2 flex items-center justify-center mx-0.5 text-2xl font-bold rounded transition-all duration-200',
        {
            // Empty cell
            'bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-600': !status && !value,
            // Cell with value
            'bg-white dark:bg-slate-800 border-slate-500 dark:border-slate-400 text-slate-900 dark:text-slate-100':
                !status && value,
            // Completed states with colors
            'bg-slate-500 dark:bg-slate-600 text-white border-slate-500 dark:border-slate-600':
                status === 'absent' && showColor,
            'bg-green-500 dark:bg-green-600 text-white border-green-500 dark:border-green-600':
                status === 'correct' && showColor,
            'bg-yellow-500 dark:bg-yellow-600 text-white border-yellow-500 dark:border-yellow-600':
                status === 'present' && showColor,
            // Animations
            'pop-in': !status && value,
            'flip-in': animationState === AnimationState.FlipIn,
            'flip-out': animationState === AnimationState.FlipOut,
            shake: invalid,
            win: animationState === AnimationState.Win,
        },
    )

    const showValue = (completed && showColor) || !completed

    useEffect(() => {
        if (status && !win) {
            const timeoutIn = setTimeout(() => {
                setAnimationState(AnimationState.FlipIn)
            }, delay)
            const timeoutOut = setTimeout(() => {
                setAnimationState(AnimationState.FlipOut)
            }, 250 + delay)
            return () => {
                clearTimeout(timeoutIn)
                clearTimeout(timeoutOut)
            }
        }
        if (win) {
            const timeout = setTimeout(() => {
                setAnimationState(AnimationState.Win)
            }, delay)
            return () => {
                clearTimeout(timeout)
            }
        }
    }, [status, win, delay])

    return <div className={classes}>{showValue ? value : ''}</div>
}
