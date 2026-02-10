import { Fragment } from 'react'
import { Dialog, DialogTitle, Transition, TransitionChild } from '@headlessui/react'
import { Cell } from '../grid/Cell'
import { XMarkIcon } from '@heroicons/react/24/outline'

type Props = {
    isOpen: boolean
    handleClose: () => void
}

export const InfoModal = ({ isOpen, handleClose }: Props) => {
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
                                        className="text-lg leading-6 font-bold text-slate-900 dark:text-slate-100"
                                    >
                                        Како се игра
                                    </DialogTitle>
                                    <div className="mt-2">
                                        <p className="text-left text-base text-slate-600 dark:text-slate-300">
                                            Погодете го <b className="text-slate-800 dark:text-slate-200">ЗБОРЛЕ</b> во
                                            6 обиди.
                                        </p>

                                        <p className="text-left text-base text-slate-600 dark:text-slate-300 mt-2">
                                            Секој обид мора да биде валиден збор од 5 букви. Притиснете го копчето ENTER
                                            да направите обид.
                                        </p>

                                        <p className="text-left text-base text-slate-600 dark:text-slate-300 mt-2 border-b-2 border-slate-200 dark:border-slate-600 pb-2">
                                            По секој обид, бојата на квадратите ќе се менува да ви покаже колку вашиот
                                            обид е блиску до бараниот збор.
                                        </p>

                                        <h4 className="font-bold text-slate-800 dark:text-slate-200 mt-2">Примери</h4>

                                        <div className="flex justify-center mb-1 mt-4">
                                            <Cell value="П" status="correct" completed={true} />
                                            <Cell value="И" />
                                            <Cell value="Л" />
                                            <Cell value="О" />
                                            <Cell value="Т" />
                                        </div>
                                        <p className="text-sm text-slate-600 dark:text-slate-400">
                                            Буквата <b className="text-slate-800 dark:text-slate-200">П</b> е во зборот
                                            и на <b className="text-slate-800 dark:text-slate-200">точна</b> позиција.
                                        </p>

                                        <div className="flex justify-center mb-1 mt-4">
                                            <Cell value="Ч" />
                                            <Cell value="О" />
                                            <Cell value="Р" status="present" completed={true} />
                                            <Cell value="Б" />
                                            <Cell value="А" />
                                        </div>
                                        <p className="text-sm text-slate-600 dark:text-slate-400">
                                            Буквата <b className="text-slate-800 dark:text-slate-200">Р</b> е во зборот
                                            но на <b className="text-slate-800 dark:text-slate-200">погрешна</b>{' '}
                                            позиција.
                                        </p>

                                        <div className="flex justify-center mb-1 mt-4">
                                            <Cell value="Ш" />
                                            <Cell value="А" />
                                            <Cell value="П" />
                                            <Cell value="К" status="absent" completed={true} />
                                            <Cell value="А" />
                                        </div>
                                        <p className="text-sm text-slate-600 dark:text-slate-400">
                                            Буквата <b className="text-slate-800 dark:text-slate-200">К</b> не е во
                                            зборот на ниту една позиција.
                                        </p>
                                    </div>

                                    <p className="text-left text-base text-slate-600 dark:text-slate-300 mt-4 border-t-2 border-slate-200 dark:border-slate-600 pt-2">
                                        Нов <b className="text-slate-800 dark:text-slate-200">ЗБОРЛЕ</b> е достапен
                                        секој ден.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </TransitionChild>
                </div>
            </Dialog>
        </Transition>
    )
}
