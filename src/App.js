import './App.css';
import Boards from './Components/Boards';
import { Route, Routes } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Boards />} />
      </Routes>
      
    </div>
  );
}

export default App;
