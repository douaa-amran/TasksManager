import './App.css';
import Boards from './Components/Boards';
import { Route, Routes } from 'react-router-dom';
import Tasks from './Components/Tasks';
import TaskEdFo from './Components/TaskEdFo';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Boards />} />
        <Route path='/tasks/:idBoard' element={<Tasks/>} />
      </Routes>
    </div>
  );
}

export default App;
