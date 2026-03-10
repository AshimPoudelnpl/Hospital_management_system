import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from './shared/Navbar';
import HomePage from "./pages/HomePage";
import Services from "./pages/Services";
import Doctors from "./pages/Doctors";
import Departments from "./pages/Departments";
import Specialists from "./pages/Specialists";
import About from "./pages/About";
import Contact from "./pages/Contact";
import BookAppointment from "./pages/BookAppointment";

const App = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/services" element={<Services />} />
        <Route path="/services/:slug" element={<Services />} />
        <Route path="/doctors" element={<Doctors />} />
        <Route path="/departments" element={<Departments />} />
        <Route path="/specialists" element={<Specialists />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/book-appointment" element={<BookAppointment />} />
      </Routes>
    </div>
  );
};

export default App;
