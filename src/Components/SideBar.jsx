import React, { useEffect } from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getBoards, setSelectedBoard } from '../redux/BoardSlice';
import { IoIosAdd } from "react-icons/io";
import { Link } from 'react-router-dom';
import { FaClipboardList } from "react-icons/fa";


export default function SideBar({toggleB,toggleT}) {
    const boards = useSelector(state => state.boards.boards)
    const dispatch = useDispatch();
    const [visibleDD, setVisibleDD] = useState(true)
    

    useEffect(() => {
        dispatch(getBoards());
    }, [dispatch]);

    const toggleDropDown = () => {
        setVisibleDD(!visibleDD);
    }
    
    
    return (
        <div id="drawer-navigation" className="fixed h-screen p-4 overflow-y-auto transition-transform translate-x-0 bg-white basis-80 dark:bg-gray-800" tabIndex="-1" aria-labelledby="drawer-navigation-label">
            <h5 id="drawer-navigation-label" className="text-4xl px-20 pt-12 pb-10 border-b-4 border-gray-500 font-semibold text-gray-500 uppercase dark:text-gray-400 ">Menu</h5>


            <div className="py-10 ">
                <ul className="space-y-2 font-medium">
                    <li>
                        <Link href="#" to={'/'} className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                            <svg className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 21">
                                <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z" />
                                <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z" />
                            </svg>
                            <span className="ms-3">Dashboard</span>
                        </Link>
                    </li>
                    <li>
                        <div className='flex rounded-lg dark:hover:bg-gray-700'>
                            <button type="button" className="flex items-center w-full p-2 text-base text-gray-900 transition duration-75  group dark:text-white " aria-controls="dropdown-example" data-collapse-toggle="dropdown-example" onClick={toggleDropDown}>
                                <FaClipboardList/>
                                <span className="flex-1 ms-3 text-left rtl:text-right whitespace-nowrap">Boards</span>
                                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
                                </svg>
                            </button>
                            <button
                                type="button"
                                className="flex items-center text-gray-900 dark:text-white  group font-extrabold text-2xl"
                                onClick={toggleB}
                            >
                                <IoIosAdd />
                            </button>
                            
                        </div>


                        <ul id="dropdown-example" className={`${visibleDD ? '' : 'hidden'} py-2 space-y-2`}>
                            {boards && boards.map((board, i) => (
                                <li key={i} className='flex rounded-lg text-gray-500 hover:text-white ml-9 hover:bg-gray-700 '>
                                    <Link href="#" className="flex items-center w-full p-2 transition duration-75   group " to={`/tasks/${board._id?.$oid}`}>{board.board_name}</Link>
                                    <button
                                        type="button"
                                        className="flex items-center group font-extrabold text-2xl"
                                        onClick={() => {
                                            toggleT();
                                            
                                            dispatch(setSelectedBoard(board._id?.$oid))
                                        }}
                                    >
                                        <IoIosAdd />
                                    </button>
                                </li>
                            ))}

                        </ul>
                        
                    </li>
                </ul>
            </div>
            
        </div>


    )
}
