type Props = {
    index: number
    size: number
    label: string
}

export const Progress = ({ index, size, label }: Props) => {
    return (
        <div className="flex justify-left m-1 items-center">
            <div className="justify-center w-2">{index + 1}</div>
            <div className="rounded-full w-full ml-2">
                <div
                    style={{ width: `${5 + size}%` }}
                    className={`${
                        size > 0 ? 'bg-green-600' : 'bg-gray-500'
                    } text-white text-bold text-xs font-bold text-center p-1`}
                >
                    {label}
                </div>
            </div>
        </div>
    )
}
