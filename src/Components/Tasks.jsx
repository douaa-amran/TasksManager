import React from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getTasks } from '../redux/TasksSlice'
import Task from './Task'

export default function Tasks() {
  const { idBoard } = useParams();
  const tasks = useSelector((state) => state.tasks.tasks);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTasks(idBoard));
  }, [dispatch, idBoard]);

  return (
    <div className="md:w-full lg:w-3/4 m-auto p-4">
      <ul className="my-4 space-y-3">
        {tasks.map((t) => (
          <Task
            key={t.task_id}
            id={t.task_id}
            id_board={idBoard}
            name={t.task_name}
            des={t.description}
            status={t.status}
          />
        ))}
      </ul>
    </div>
  );
}

