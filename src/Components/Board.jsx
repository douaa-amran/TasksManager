import React from 'react';
import { useState } from 'react';
import { FaTrash, FaEdit, FaEye } from 'react-icons/fa';
import { CiSaveUp1 } from "react-icons/ci";
import { MdOutlineCancel } from "react-icons/md";
import { useDispatch } from 'react-redux';
import { deleteBoard, modifier, supprimer, updateBoard } from '../redux/BoardSlice';
import './board.css';

export default function Board(props) {
  const dispatch = useDispatch();
  const [editable, setEditable] = useState(false);
  const [editedName, setEditedName] = useState(props.name);

  const handleEdit = () => {
    setEditable(true);
  };

  const handleSave = () => {
    dispatch(updateBoard({ id: props.id, newName: editedName }));
    setEditable(false);
  };

  const handleCancelEdit = () => {
    setEditable(false);
    setEditedName(props.name);
  };

  return (
    <div className="card">
      <div className="text">
        {editable ? (
          <input
            type="text"
            value={editedName}
            onChange={(e) => setEditedName(e.target.value)}
          />
        ) : (
          <span>{props.name}</span>
        )}
      </div>
      <div className="icons">
        <a className="btn" href="#" onClick={() => dispatch(deleteBoard(props.id))}>
          {/* Delete Icon */}
          <FaTrash />
        </a>
        {editable ? (
          <>
            <a className="btn" href="#" onClick={handleSave}>
              {/* Save Icon */}
              <CiSaveUp1 />
            </a>
            <a className="btn" href="#" onClick={handleCancelEdit}>
              {/* Cancel Icon */}
              <MdOutlineCancel />
            </a>
          </>
        ) : (
          <a className="btn" href="#" onClick={handleEdit}>
            {/* Edit Icon */}
            <FaEdit />
          </a>
        )}
        <a className="btn" href="#">
          {/* Visibility Icon */}
          <FaEye />
        </a>
      </div>
    </div>
  );
}
