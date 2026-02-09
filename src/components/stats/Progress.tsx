type Props = {
    index: number
    size: number
    label: string
}

export const Progress = ({ index, size, label }: Props) => {
    return (
        <div className="flex justify-left m-1 items-center">
            <div className="justify-center w-2 text-slate-700 dark:text-slate-300 font-medium">{index + 1}</div>
            <div className="rounded-full w-full ml-2">
                <div
                    style={{ width: `${5 + size}%` }}
                    className={`${
                        size > 0 ? 'bg-green-600 dark:bg-green-700' : 'bg-slate-400 dark:bg-slate-600'
                    } text-white text-bold text-xs font-bold text-center p-1 rounded`}
                >
                    {label}
                </div>
            </div>
        </div>
    )
}
