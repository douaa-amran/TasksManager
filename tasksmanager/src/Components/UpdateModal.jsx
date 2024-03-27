import React, { useEffect, useRef } from 'react'
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateTaskStatus } from '../redux/TasksSlice';

export default function UpdateModal({ toggle, id_board }) {
    const tasks = useSelector((state) => state.tasks.tasks);
    const taskId = useSelector((state) => state.tasks.selectedTask);
    const task = tasks.find((task) => task.task_id === taskId)
    const dispatch = useDispatch()

    const [name, setName] = useState(() => task.task_name);
    const [description, setDescription] = useState(task.description);
    const [dueDate, setDueDate] = useState(task.due_date);

    const flatpickrRef = useRef(null);

    useEffect(() => {
        flatpickrRef.current = flatpickr('#due_date', {
            dateFormat: 'Y-m-d',
            onChange: (selectedDates, dateStr) => {
                setDueDate(dateStr);
            },
        });

        return () => {
            flatpickrRef.current.destroy();
        };
    }, []);

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
                            <h2 className="mt-4 text-center text-3xl font-bold leading-9 tracking-tight text-custom-purpletext">
                                Edit Task
                            </h2>
                        </div>

                        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                            <form onSubmit={(e) => {
                                e.preventDefault();
                                console.log('Form submitted');
                                toggle();
                                dispatch(updateTaskStatus({ boardId: id_board, taskId: taskId, name, description, due_date: dueDate }));
                            }}
                                className="space-y-8" action="#" method="POST">
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-300">
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
                                    <label htmlFor="description" className="block text-sm font-medium leading-6 text-gray-300">
                                        Description
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            id="description"
                                            name="description"
                                            type="text"
                                            required
                                            value={description}
                                            onChange={(e) => setDescription(e.target.value)}
                                            className="block w-full rounded-md border-0 py-1.5 font-medium text-gray-300 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-custom-purpletext sm:text-sm sm:leading-6 text-left"
                                        />
                                    </div>
                                </div>

                                <div >
                                    <label htmlFor="due_date" className="block text-sm font-medium leading-6 text-gray-300">
                                        Due Date
                                    </label>
                                    <div className="mt-2 flex">
                                        <input
                                            id="due_date"
                                            name="due_date"
                                            type="date"
                                            data-date-format="Y-m-d"
                                            required
                                            value={dueDate}
                                            onChange={(e) => setDueDate(e.target.value)}
                                            className="flatpickr block w-full rounded-md border-0 py-1.5 font-medium text-gray-300 shadow-sm ring-1 ring-inset ring-gray-300  focus:ring-2 focus:ring-inset focus:ring-custom-purpletext sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                </div>

                                <div className="pt-6">
                                    <button
                                        type="submit"
                                        className="flex w-full justify-center rounded-md bg-custom-purple px-3 py-2 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-custom-purplehover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"

                                    >
                                        Save Changes
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
