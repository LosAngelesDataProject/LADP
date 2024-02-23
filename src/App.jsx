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
import SiteNav from "./components/SiteNav";
import NotFound from "./components/NotFound";

function App() {

  const [state, setState] = useState({
    isRegisterClicked: false
  });

  const onRegisterClicked = (response) => {
    console.log("response in onRegisterClick app.Jsx", response)
  };

  return (
    <BrowserRouter>
      <Fragment>
        <SiteNav
          set={setState}
          registered={state.isRegisterClicked}
        />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/aboutUs" element={<AboutUs />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/login" element={<Login />} />
          <Route path="/navigate" element={<Navigate />} />
          <Route path="/register" element={<Register onRegisterClicked={onRegisterClicked} />} />
          <Route path="*" element={<NotFound />} />
        </Routes>

        {/* <Main /> */}

        <Footer />
      </Fragment>
    </BrowserRouter>
  );
}

export default App;
