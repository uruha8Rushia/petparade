import React from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from "./component/Navbar";
import Home from "./pages/Home";
import About from "./pages/About";
import Product from "./pages/Product";
import FAQ from "./pages/FAQ";
import OrderFAQ from "./pages/FAQ_category/OrderFAQ";
import PaymentFAQ from "./pages/FAQ_category/PaymentFAQ";
import DeliveryFAQ from "./pages/FAQ_category/DeliveryFAQ";
import ReturnsFAQ from "./pages/FAQ_category/ReturnsFAQ";
import LoginForm from "./pages/Login";

function App() {
  return (
    <Router>
      <Routes>
        {/* Navbar should not appear on the login page */}
        <Route
          path="/*"
          element={
            window.location.pathname !== "/login" ? (
              <>
                <Navbar />
                <Routes>
                  <Route path="/home" element={<Home />} />
                  {/* About page */}
                  <Route path="/about" element={<About />} />
                  {/* Product page */}
                  <Route path="/product" element={<Product />} />
                  {/* FAQ page */}
                  <Route path="/faq" element={<FAQ />} />
                  {/* FAQ Category Routes */}
                  <Route path="/order-faq" element={<OrderFAQ />} />
                  <Route path="/payment-faq" element={<PaymentFAQ />} />
                  <Route path="/delivery-faq" element={<DeliveryFAQ />} />
                  <Route path="/returns-faq" element={<ReturnsFAQ />} />
                </Routes>
              </>
            ) : null
          }
        />
        {/* Login Page */}
        <Route path="/login" element={<LoginForm />} />
      </Routes>
    </Router>
  );
}

export default App;
