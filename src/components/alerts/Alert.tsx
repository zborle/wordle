import { Fragment } from 'react'
import { Transition } from '@headlessui/react'
import classNames from 'classnames'

type Props = {
    isOpen: boolean
    message: string
    variant?: 'success' | 'warning' | 'error'
}

export const Alert = ({ isOpen, message, variant = 'warning' }: Props) => {
    const classes = classNames(
        'fixed top-4 left-1/2 transform -translate-x-1/2 max-w-sm w-auto min-w-[280px] shadow-lg rounded-lg pointer-events-auto overflow-hidden z-50',
        {
            'bg-red-100 dark:bg-red-900/80 border border-red-300 dark:border-red-700': variant === 'error',
            'bg-yellow-100 dark:bg-yellow-900/80 border border-yellow-300 dark:border-yellow-700':
                variant === 'warning',
            'bg-green-100 dark:bg-green-900/80 border border-green-300 dark:border-green-700': variant === 'success',
        },
    )

    return (
        <Transition
            show={isOpen}
            as={Fragment}
            enter="ease-out duration-300 transition"
            enterFrom="opacity-0 -translate-y-2"
            enterTo="opacity-100 translate-y-0"
            leave="transition ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 -translate-y-2"
        >
            <div className={classes}>
                <div className="px-6 py-3">
                    <p
                        className={classNames('text-sm text-center font-medium', {
                            'text-red-800 dark:text-red-200': variant === 'error',
                            'text-yellow-800 dark:text-yellow-200': variant === 'warning',
                            'text-green-800 dark:text-green-200': variant === 'success',
                        })}
                    >
                        {message}
                    </p>
                </div>
            </div>
        </Transition>
    )
}
