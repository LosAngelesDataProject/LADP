import { Fragment } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AboutUs from "./components/AboutUs";
import Calendar from "./components/Calendar";
import Footer from "./components/Footer";
import Home from "./components/home/Home";
import Login from "./components/Login";
import Navigate from "./components/Navigate";
import Register from "./components/Register";
import SiteNav from "./components/SiteNav";
import NotFound from "./components/NotFound";
import ContactUs from "./components/ContactUs";

function App() {

  return (
    <Fragment>
      <SiteNav />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/login" element={<Login />} />
          <Route path="/navigate" element={<Navigate />} />
          <Route path="/register" element={<Register />} />
          <Route path="/contact-us" element={<ContactUs />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>

      {/* <Main /> */}

      <Footer />
    </Fragment>
  );
}

export default App;
