import "./App.css";
import { Routes, Route } from "react-router-dom";

import Homepage from "./Componants/Homepage";
import AboutSection from "./Componants/AboutSection";
import ContactSection from "./Componants/ContactSection";
import LoginSignup from "./Componants/LoginSignup"
import ProductsSection from "./Componants/ProductsSection";
import SingleProductPage from "./Componants/SingleProductPage";
import AdminLoginCarousel from "./components/ui/auth/admin-login-carousel";
import AdminDashboard from "./admin/pages/AdminDashboard";
import AllProducts from "./admin/pages/AllProducts";
import AddProduct from "./admin/pages/AddProduct";
import Categories from "./admin/pages/Categories";
import AllUsers from "./admin/pages/AllUsers";
import ContactMessages from "./admin/pages/ContactMessages";
// import ProductLikeSection from "./Componants/ProductLikeSection";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginSignup />} />
      <Route path="/homepage" element={<Homepage />} />
      <Route path="/aboutsection" element={<AboutSection />} />
      <Route path="/contact" element={<ContactSection />} />
      <Route path="/products" element={<ProductsSection/>} />
      <Route path="/singleproduct" element={<SingleProductPage />} />
      {/* <Route path="/productlikesection" element={<ProductLikeSection />} /> */}

      {/* Admin Side */}
      <Route path="/admin/login"     element={<AdminLoginCarousel />} />
      <Route path="/admin/products"     element={<AllProducts />} />
      <Route path="/admin/products/add" element={<AddProduct />} />
      <Route path="/admin/categories"   element={<Categories />} />
      <Route path="/admin/users"        element={<AllUsers />} />
      <Route path="/admin/messages"     element={<ContactMessages />} />
      <Route path="/admin/*"            element={<AdminDashboard />} />
    </Routes>
  );
}

export default App;