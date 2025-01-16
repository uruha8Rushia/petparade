import React from "react";
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Home from "./pages/Home";
import About from "./pages/About";
import Product from "./pages/Product";
import FAQ from "./pages/FAQ";
import OrderFAQ from "./pages/FAQ_category/OrderFAQ";
import PaymentFAQ from "./pages/FAQ_category/PaymentFAQ";
import DeliveryFAQ from "./pages/FAQ_category/DeliveryFAQ";
import ReturnsFAQ from "./pages/FAQ_category/ReturnsFAQ";
import LoginForm from "./pages/Login";
import Signup from "./pages/Signup";
import Footer from "./component/Footer";
import Navbar from "./component/Navbar";
import BackendTest from "./pages/BackendTest"; 

function App() {
  const location = useLocation();
  const hideNavbarFooter = location.pathname === "/" || location.pathname === "/login";

  return (
    <div>
      {!hideNavbarFooter && <Navbar />}
      <Routes>
        {/* Signup Page as default */}
        <Route path="/" element={<Signup />} />
        {/* Login Page */}
        <Route path="/login" element={<LoginForm />} />
        {/* Home Page */}
        <Route path="/home" element={<Home />} />
        {/* Other routes */}
        <Route path="/about" element={<About />} />
        <Route path="/product" element={<Product />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/order-faq" element={<OrderFAQ />} />
        <Route path="/payment-faq" element={<PaymentFAQ />} />
        <Route path="/delivery-faq" element={<DeliveryFAQ />} />
        <Route path="/returns-faq" element={<ReturnsFAQ />} />
        <Route path="/backend-test" element={<BackendTest />} />
      </Routes>
      {!hideNavbarFooter && <Footer />}
    </div>
  );
}

function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}

export default AppWrapper;