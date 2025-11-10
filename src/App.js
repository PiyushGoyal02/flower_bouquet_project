import './App.css';
import Homepage from './Componants/Homepage'
import { Route, Routes } from 'react-router-dom';

function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Homepage/>}/>
      </Routes>
    </div>
  );
}

export default App;