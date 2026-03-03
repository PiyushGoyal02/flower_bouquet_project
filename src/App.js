import "./App.css";
import { Routes, Route } from "react-router-dom";

import Homepage from "./Componants/Homepage";
import AboutSection from "./Componants/AboutSection";
import ContactSection from "./Componants/ContactSection";
import LoginSignup from "./Componants/LoginSignup"

function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginSignup />} />
      <Route path="/homepage" element={<Homepage />} />
      <Route path="/aboutsection" element={<AboutSection />} />
      <Route path="/contact" element={<ContactSection />} />
      {/* <Route path="/login" element={<LoginSignup />} /> */}
    </Routes>
  );
}

export default App;