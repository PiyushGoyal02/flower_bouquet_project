import './App.css';
import Homepage from './Componants/Homepage'
import { Route, Routes } from 'react-router-dom';
import AboutSection from './Componants/AboutSection';
import ContactSection from './Componants/ContactSection';

function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Homepage/>}/>
        <Route path='/aboutsection' element={<AboutSection/>}/>
        <Route path='/contact' element={<ContactSection/>}/>
      </Routes>
    </div>
  );
}

export default App;