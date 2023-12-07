import React from 'react';
import { FaTrash, FaEdit, FaEye } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { deleteBoard, modifier, supprimer } from '../redux/BoardSlice';
import './board.css';

export default function Board(props) {
    const dispatch = useDispatch();

  return (
    <div className="card">
      <div className="text">
        <span>{props.name}</span>
      </div>
      <div className="icons">
        <a className="btn" href="#" onClick={()=>dispatch(deleteBoard(props.id))}>
          {/* Delete Icon */}
          <FaTrash />
        </a>
        <a className="btn" href="#" onClick={()=>dispatch(modifier({id:props.id,name:props.name}))}>
          {/* Edit Icon */}
          <FaEdit />
        </a>
        <a className="btn" href="#">
          {/* Visibility Icon */}
          <FaEye />
        </a>
      </div>
    </div>
  );
}
