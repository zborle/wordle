import { Fragment } from 'react'
import { Dialog, DialogTitle, Transition, TransitionChild } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { StatBar } from '../stats/StatBar'
import { Histogram } from '../stats/Histogram'
import { GameStats } from '../../lib/localStorage'

type Props = {
    isOpen: boolean
    handleClose: () => void
    gameStats: GameStats
}

export const StatsModal = ({ isOpen, handleClose, gameStats }: Props) => {
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
                                <div className="text-center">
                                    <DialogTitle
                                        as="h3"
                                        className="text-lg leading-6 font-bold text-slate-900 dark:text-slate-100 uppercase"
                                    >
                                        Статистика
                                    </DialogTitle>
                                    <StatBar gameStats={gameStats} />
                                    <h4 className="text-lg leading-6 font-bold text-slate-900 dark:text-slate-100 uppercase mt-4">
                                        Распределба на погодоци
                                    </h4>
                                    <Histogram gameStats={gameStats} />
                                </div>
                            </div>
                        </div>
                    </TransitionChild>
                </div>
            </Dialog>
        </Transition>
    )
}
