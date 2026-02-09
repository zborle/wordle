import { ReactNode } from 'react'
import classnames from 'classnames'
import { KeyValue } from '../../lib/keyboard'
import { CharStatus } from '../../lib/statuses'

type Props = {
    children?: ReactNode
    value: KeyValue
    width?: number
    status?: CharStatus
    onClick: (value: KeyValue) => void
}

export const Key = ({ children, status, width = 40, value, onClick }: Props) => {
    const isEnter = value === 'ENTER'
    const classes = classnames(
        'flex items-center justify-center rounded mx-0.5 font-bold cursor-pointer transition-all duration-150 select-none',
        {
            // Font size - smaller for ENTER
            'text-sm': isEnter,
            'text-lg': !isEnter,
            // Default state
            'bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 active:bg-slate-400 dark:active:bg-slate-500 text-slate-800 dark:text-slate-200':
                !status,
            // Absent state
            'bg-slate-500 dark:bg-slate-600 text-white': status === 'absent',
            // Correct state
            'bg-green-500 dark:bg-green-600 hover:bg-green-600 dark:hover:bg-green-700 active:bg-green-700 dark:active:bg-green-800 text-white':
                status === 'correct',
            // Present state
            'bg-yellow-500 dark:bg-yellow-600 hover:bg-yellow-600 dark:hover:bg-yellow-700 active:bg-yellow-700 dark:active:bg-yellow-800 text-white':
                status === 'present',
        },
    )

    return (
        <div style={{ width: `${width}px`, height: '58px' }} className={classes} onClick={() => onClick(value)}>
            {children || value}
        </div>
    )
}
