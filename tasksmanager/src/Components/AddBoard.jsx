import React, { useEffect, useRef } from 'react'
import { useState } from 'react';
import { useDispatch} from 'react-redux';
import { addBoard, getBoards } from '../redux/BoardSlice';

export default function AddBoard({ toggle }) {
    const dispatch = useDispatch()
    const [name, setName] = useState('');

    useEffect(()=>{
        dispatch(getBoards())
    },[addBoard()])

    return (
        <div id="default-modal" tabIndex="-1" aria-hidden="true" className="overflow-y-auto overflow-x-hidden right-0 top-0 left-0 fixed z-50 flex justify-center items-center w-full md:inset-0 h-[calc(100%)] max-h-full bg-slate-700/70">
            <div className="relative w-full max-w-2xl max-h-full">


                <div className='flex justify-center items-center'>
                    <div className="flex md:w-4/5 sm:w-4/5 lg:w-5/6 min-h-full flex-col justify-center py-5 pb-20 px-5 rounded-xl bg-gray-800">
                        <div className="flex items-center justify-between  rounded-t dark:border-gray-600">
                            <button type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="default-modal" onClick={toggle}>
                                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                </svg>
                                <span className="sr-only">Close modal</span>
                            </button>
                        </div>
                        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                            <h2 className="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-custom-purpletext ">
                                Add Board
                            </h2>
                        </div>

                        <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-sm">
                            <form onSubmit={(e) => {
                                e.preventDefault();
                                toggle();
                                dispatch(addBoard({board_name:name,tasks:[]}));
                                }}
                                className="space-y-8" action="#" method="POST">
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium leading-6 text-left text-gray-300">
                                        Name
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            id="name"
                                            name="name"
                                            type="text"
                                            required
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            className="block w-full rounded-md border-0 py-1.5 font-medium text-gray-300 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-custom-purpletext sm:text-sm sm:leading-6 text-left"
                                        />
                                    </div>
                                </div>

                                
                                <div>
                                    <button
                                        type="submit"
                                        className="flex w-full justify-center rounded-md bg-custom-purple px-3 py-2 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-custom-purplehover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"

                                    >
                                        Save Board
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
