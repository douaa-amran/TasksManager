import './App.css';
import Boards from './Components/Boards';
import { Route, Routes } from 'react-router-dom';
import Tasks from './Components/Tasks';
import Drawer from './Components/Drawer';

function App() {
  return (
    <div className="App">
      <Drawer/>
      <Routes>
        <Route path='/' element={<Boards />} />
        <Route path='/tasks/:idBoard' element={<Tasks />} />
      </Routes>

    </div>
  );
}

export default App;
