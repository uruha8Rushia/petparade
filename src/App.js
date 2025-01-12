import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./component/Navbar";
import Home from "./pages/Home";
import About from "./pages/About";
import Product from "./pages/Product";
import FAQ from "./pages/FAQ";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        {/* Default route (Home page) */}
        <Route path="/" element={<Home />} />
        
        {/* About page */}
        <Route path="/about" element={<About />} />

        {/* Product page */}
        <Route path="/product" element={<Product />} />

        <Route path="/faq" element={<FAQ />} /> {/* FAQ Route */}
      </Routes>
    </Router>
  );
}

export default App;
