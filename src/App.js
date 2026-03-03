import "./App.css";
import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute/ProtectedRoute";

import Homepage from "./Componants/Homepage";
import AboutSection from "./Componants/AboutSection";
import ContactSection from "./Componants/ContactSection";
import LoginSignup from "./Componants/LoginSignup"

function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginSignup />} />
      <Route path="/homepage" element={<ProtectedRoute><Homepage /></ProtectedRoute>} />
      <Route path="/aboutsection" element={<ProtectedRoute><AboutSection /></ProtectedRoute>} />
      <Route path="/contact" element={<ProtectedRoute><ContactSection /></ProtectedRoute>} />
      {/* <Route path="/login" element={<LoginSignup />} /> */}
    </Routes>
  );
}

export default App;