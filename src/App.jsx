import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import AboutUs from "./components/AboutUs";
import Calendar from "./components/Calendar";
import Footer from "./components/footer/HomeFooter";
import Home from "./components/home/Home";
import Login from "./components/Login";
import Navigate from "./components/Navigate";
import Register from "./components/register/Register";
import NotFound from "./components/NotFound";
import ContactUs from "./components/contact/ContactUs";
import NavBar from "./components/NavBar";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  const handleLogin = () => {
    setIsLoggedIn(!isLoggedIn);
  };


  return (
      <>
        <NavBar isLoggedIn={isLoggedIn} onLogout={handleLogin} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/calendar" element={<Calendar/>} />
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route path="/navigate" element={<Navigate />} />
          <Route path="/register" element={<Register />} />
          <Route path="/contact-us" element={<ContactUs />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </>
  );
}

export default App;
