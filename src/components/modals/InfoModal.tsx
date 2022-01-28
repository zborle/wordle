import { Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { Cell } from '../grid/Cell'
import { XIcon } from '@heroicons/react/outline'

type Props = {
    isOpen: boolean
    handleClose: () => void
}

export const InfoModal = ({ isOpen, handleClose }: Props) => {
    return (
        <Transition.Root show={isOpen} as={Fragment}>
            <Dialog as="div" className="fixed z-10 inset-0 overflow-y-auto" onClose={handleClose}>
                <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                    </Transition.Child>

                    {/* This element is to trick the browser into centering the modal contents. */}
                    <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
                        &#8203;
                    </span>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        enterTo="opacity-100 translate-y-0 sm:scale-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                        leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                    >
                        <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-sm sm:w-full sm:p-6">
                            <div className="absolute right-4 top-4">
                                <XIcon
                                    className="h-6 w-6 cursor-pointer hover:bg-slate-200"
                                    onClick={() => handleClose()}
                                />
                            </div>
                            <div>
                                <div className="text-center">
                                    <Dialog.Title as="h3" className="text-lg leading-6 font-medium text-gray-900">
                                        Како се игра
                                    </Dialog.Title>
                                    <div className="mt-2">
                                        <p className="text-left text-md text-gray-500">
                                            Погодете го <b>ЗБОРЛЕ</b> во 6 обиди.
                                        </p>

                                        <p className="text-left text-md text-gray-500 mt-2">
                                            Секој обид мора да биде валиден збор од 5 букви. Притиснете го копчето ENTER
                                            да направите обид.
                                        </p>

                                        <p className="text-left text-md text-gray-500 mt-2 border-b-2 pb-2">
                                            По секој обид, бојата на квадратите ќе се менува да ви покаже колку вашиот
                                            обид е блиску до бараниот збор.
                                        </p>

                                        <h4 className="font-bold text-gray-900 mt-2">Примери</h4>

                                        <div className="flex justify-center mb-1 mt-4">
                                            <Cell value="П" status="correct" />
                                            <Cell value="И" />
                                            <Cell value="Л" />
                                            <Cell value="О" />
                                            <Cell value="Т" />
                                        </div>
                                        <p className="text-sm text-gray-500">
                                            Буквата <b>П</b> е во зборот и на <b>точна</b> позиција.
                                        </p>

                                        <div className="flex justify-center mb-1 mt-4">
                                            <Cell value="Ч" />
                                            <Cell value="О" />
                                            <Cell value="Р" status="present" />
                                            <Cell value="Б" />
                                            <Cell value="А" />
                                        </div>
                                        <p className="text-sm text-gray-500">
                                            Буквата <b>Р</b> е во зборот но на <b>погрешна</b> позиција.
                                        </p>

                                        <div className="flex justify-center mb-1 mt-4">
                                            <Cell value="Ш" />
                                            <Cell value="А" />
                                            <Cell value="П" />
                                            <Cell value="К" status="absent" />
                                            <Cell value="А" />
                                        </div>
                                        <p className="text-sm text-gray-500">
                                            Буквата <b>К</b> не е во зборот на ниту една позиција.
                                        </p>
                                    </div>

                                    <p className="text-left text-md text-gray-500 mt-2 border-t-2 pt-2">
                                        Нов <b>ЗБОРЛЕ</b> е достапен секој ден.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </Transition.Child>
                </div>
            </Dialog>
        </Transition.Root>
    )
}
