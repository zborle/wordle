import { CharStatus } from '../../lib/statuses'
import classnames from 'classnames'

type Props = {
    status: CharStatus
}

export const MiniCell = ({ status }: Props) => {
    const classes = classnames('w-10 h-10 border-2 flex items-center justify-center mx-0.5 text-lg font-bold rounded', {
        'bg-slate-500 dark:bg-slate-600 border-slate-500 dark:border-slate-600': status === 'absent',
        'bg-green-500 dark:bg-green-600 border-green-500 dark:border-green-600': status === 'correct',
        'bg-yellow-500 dark:bg-yellow-600 border-yellow-500 dark:border-yellow-600': status === 'present',
    })

    return <div className={classes}></div>
}
