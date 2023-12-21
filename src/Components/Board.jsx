import React, { useEffect,useState } from 'react';
import { FaTrash, FaEdit } from 'react-icons/fa';
import { IoIosSave } from "react-icons/io";
import { MdMoreHoriz } from "react-icons/md";
import { MdOutlineCancel } from "react-icons/md";
import { useDispatch } from 'react-redux';
import { deleteBoard, updateBoard } from '../redux/BoardSlice';
import './board.css';
import { Link } from 'react-router-dom';

export default function Board(props) {
  const dispatch = useDispatch();
  const [editable, setEditable] = useState(false);
  const [editedName, setEditedName] = useState(props.name);
console.log(props.id)
  useEffect(() => {
    setEditedName(props.name);
  }, [props.name]);

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
          <span className='flex justify-center text-center'>{props.name}</span>
        )}
      </div>
      <div className="icons font-extrabold">
        <a className="btn" href="#" onClick={() => dispatch(deleteBoard(props.id))}>
          {/* Delete Icon */}
          <FaTrash />
        </a>
        {editable ? (
          <>
            <a className="btn" href="#" onClick={handleSave}>
              {/* Save Icon */}
              <IoIosSave />
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
        <Link className="btn" to={`/tasks/${props.id?.$oid}`}>
          <MdMoreHoriz />
        </Link>
      </div>
    </div>
  );
}
