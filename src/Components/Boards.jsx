import React from 'react'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getBoards } from '../redux/BoardSlice';
import Board from './Board';

export default function Boards() {
  const boards = useSelector(state=> state.boards.boards)
  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(getBoards())
  },[])
    
  return (
    boards &&
    <div className='boards p-10 grid grid-cols-3 gap-4 gap-y-10 ml-96 '>
      {boards.map((b,i) => <Board key={i} name={b.board_name} id={b._id}/>)}
    </div>
  )
}
