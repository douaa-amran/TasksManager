import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getTasks } from '../redux/TasksSlice'
import Task from './Task'
import UpdateModal from './UpdateModal'

export default function Tasks() {
  const { idBoard } = useParams();
  const tasks = useSelector((state) => state.tasks.tasks);
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);

  const toggle = () => {
    setVisible(!visible)
  };

  useEffect(() => {
    dispatch(getTasks(idBoard));
  }, [dispatch, idBoard]);

  return (
    <>
      <div className="ml-96 md:w-full lg:w-3/5 m-auto p-4">
        <ul className="my-4 space-y-3">
          {tasks.map((t) => (
            <>
              <Task
                key={t.task_id}
                taskId={t.task_id}
                id_board={idBoard}
                name={t.task_name}
                des={t.description}
                dueDate={t.due_date}
                status={t.status}
                toggle={toggle}
              />
            </>
          ))}
        </ul>
      </div>
      <div>
        {visible && <UpdateModal id_board={idBoard} toggle={toggle}/>}
      </div>
    </>
  );
}

