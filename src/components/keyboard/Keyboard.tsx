import { FIRST_ROW, KeyValue, LETTERS_EN, LETTERS_MK, SECOND_ROW, THIRD_ROW } from '../../lib/keyboard'
import { CharValue, getStatuses } from '../../lib/statuses'
import { Key } from './Key'
import { useEffect } from 'react'
import { BackspaceIcon } from '@heroicons/react/outline'

type Props = {
    onChar: (value: string) => void
    onDelete: () => void
    onEnter: () => void
    guesses: string[]
}

export const Keyboard = ({ onChar, onDelete, onEnter, guesses }: Props) => {
    const charStatuses = getStatuses(guesses)

    const onClick = (value: KeyValue) => {
        if (value === 'ENTER') {
            onEnter()
        } else if (value === 'DELETE') {
            onDelete()
        } else {
            onChar(value)
        }
    }

    useEffect(() => {
        const listener = (e: KeyboardEvent) => {
            if (e.code === 'Enter') {
                onEnter()
            } else if (e.code === 'Backspace') {
                onDelete()
            } else {
                const key = e.key.toUpperCase()
                if (key.length === 1 && (LETTERS_MK.includes(key) || LETTERS_EN.includes(key))) {
                    onChar(key)
                }
            }
        }
        window.addEventListener('keyup', listener)
        return () => {
            window.removeEventListener('keyup', listener)
        }
    }, [onEnter, onDelete, onChar])

    return (
        <div className="mx-1">
            <div className="flex justify-center mb-1">
                {FIRST_ROW.map((letter) => (
                    <Key key={letter} value={letter as CharValue} onClick={onClick} status={charStatuses[letter]} />
                ))}
            </div>
            <div className="flex justify-center mb-1">
                {SECOND_ROW.map((letter) => (
                    <Key key={letter} value={letter as CharValue} onClick={onClick} status={charStatuses[letter]} />
                ))}
            </div>
            <div className="flex justify-center">
                <Key width={65.4} value="ENTER" onClick={onClick}>
                    ENTER
                </Key>
                {THIRD_ROW.map((letter) => (
                    <Key key={letter} value={letter as CharValue} onClick={onClick} status={charStatuses[letter]} />
                ))}
                <Key width={65.4} value="DELETE" onClick={onClick}>
                    <BackspaceIcon className="w-6 h-6" />
                </Key>
            </div>
        </div>
    )
}
