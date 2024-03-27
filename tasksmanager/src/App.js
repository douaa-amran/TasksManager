import './App.css';
import Boards from './Components/Boards';
import { Route, Routes } from 'react-router-dom';
import Tasks from './Components/Tasks';
import AddBoard from './Components/AddBoard';
import { useState } from 'react';
import SideBar from './Components/SideBar';
import AddTask from './Components/AddTask';
import { useDispatch, useSelector } from 'react-redux';

function App() {
  const [visibleAddB, setVisibleAddB] = useState(false)
  const [visibleAddT, setVisibleAddT] = useState(false)
  const selectedBoard = useSelector(state => state.boards.selectedBoard)

  const toggleAddBoard = () => {
    setVisibleAddB(!visibleAddB);
  }

  const toggleAddTask = () => {
    setVisibleAddT(!visibleAddT);
  }
  return (
    <div className="App flex">
      <SideBar toggleB={toggleAddBoard} toggleT={toggleAddTask}/>
      <Routes>
        <Route path='/' element={<Boards />} />
        <Route path='/tasks/:idBoard' element={<Tasks />} />
      </Routes>
      {visibleAddT && < AddTask toggle={toggleAddTask} id_board={selectedBoard} />}
      {visibleAddB && <AddBoard toggle={toggleAddBoard} />}
    </div>
  );
}

export default App;
