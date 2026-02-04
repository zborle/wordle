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
    const classes = classnames('flex items-center justify-center rounded mx-0.5 text-sm font-bold cursor-pointer', {
        'bg-slate-200 dark:bg-slate-600 hover:bg-slate-300 dark:hover:bg-slate-500 active:bg-slate-400 dark:active:bg-slate-500 text-gray-600 dark:text-slate-200': !status,
        'bg-slate-400 dark:bg-slate-600 text-white': status === 'absent',
        'bg-green-500 hover:bg-green-600 active:bg-green-700 text-white': status === 'correct',
        'bg-yellow-500 hover:bg-yellow-600 active:bg-yellow-700 text-white': status === 'present',
    })

    return (
        <div style={{ width: `${width}px`, height: '58px' }} className={classes} onClick={() => onClick(value)}>
            {children || value}
        </div>
    )
}
