import { Fragment, useState } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AboutUs from "./components/AboutUs";
import Calendar from "./components/Calendar";
import Footer from "./components/Footer";
import Home from "./components/Home";
import Login from "./components/Login";
import Navigate from "./components/Navigate";
import Register from "./components/Register";
import NotFound from "./components/NotFound";
import NavBar from "./components/NavBar";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <BrowserRouter>
      <Fragment>
        <NavBar isLoggedIn={isLoggedIn} onLogout={handleLogout} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route path="/navigate" element={<Navigate />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        {/* <Main /> */}
        <Footer />
      </Fragment>
    </BrowserRouter>
  );
}

export default App;
