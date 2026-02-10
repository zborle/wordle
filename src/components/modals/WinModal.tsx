import { Fragment } from 'react'
import { Dialog, DialogTitle, Transition, TransitionChild } from '@headlessui/react'
import { CheckIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { MiniGrid } from '../mini-grid/MiniGrid'
import { shareStatus } from '../../lib/share'
import { Time } from '../../lib/words'
import { TimeLeft } from './TimeLeft'

type Props = {
    isOpen: boolean
    handleClose: () => void
    guesses: string[]
    handleShare: () => void
    timeLeft: Time
}

export const WinModal = ({ isOpen, handleClose, guesses, handleShare, timeLeft }: Props) => {
    return (
        <Transition show={isOpen} as={Fragment}>
            <Dialog as="div" className="fixed z-10 inset-0 overflow-y-auto" onClose={handleClose}>
                <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                    <TransitionChild
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-gray-500 dark:bg-black bg-opacity-75 dark:bg-opacity-70 transition-opacity" />
                    </TransitionChild>

                    <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
                        &#8203;
                    </span>
                    <TransitionChild
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        enterTo="opacity-100 translate-y-0 sm:scale-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                        leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                    >
                        <div className="inline-block align-bottom bg-white dark:bg-slate-800 rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-sm sm:w-full sm:p-6">
                            <div className="absolute right-4 top-4">
                                <button
                                    onClick={handleClose}
                                    className="p-1 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                                    aria-label="Затвори"
                                >
                                    <XMarkIcon className="h-6 w-6 text-slate-500 dark:text-slate-400" />
                                </button>
                            </div>
                            <div>
                                <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 dark:bg-green-900">
                                    <CheckIcon
                                        className="h-6 w-6 text-green-600 dark:text-green-400"
                                        aria-hidden="true"
                                    />
                                </div>
                                <div className="mt-3 text-center sm:mt-5">
                                    <DialogTitle
                                        as="h3"
                                        className="text-lg leading-6 font-bold text-slate-900 dark:text-slate-100"
                                    >
                                        Го погодивте зборот!
                                    </DialogTitle>
                                    <div className="mt-2">
                                        <MiniGrid guesses={guesses} />
                                        <p className="text-sm text-slate-600 dark:text-slate-400">
                                            Одлично, споделете го резултатот од играта.
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-5">
                                <TimeLeft timeLeft={timeLeft} />
                            </div>
                            <div className="mt-5 sm:mt-6">
                                <button
                                    type="button"
                                    className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 dark:bg-green-700 text-base font-medium text-white hover:bg-green-700 dark:hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 dark:focus:ring-offset-slate-800 sm:text-sm transition-colors"
                                    onClick={() => {
                                        shareStatus(guesses)
                                        handleShare()
                                    }}
                                >
                                    Сподели
                                </button>
                            </div>
                        </div>
                    </TransitionChild>
                </div>
            </Dialog>
        </Transition>
    )
}
