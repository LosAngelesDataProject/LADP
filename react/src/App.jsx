import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import AboutUs from "./components/about/AboutUs";
import Calendar from "./components/calendar/Calendar";
import Construction from "./components/underConstruction/Construction";
import Home from "./components/home/Home";
// import Login from "./components/login/Login";
import Navigate from "./components/Navigate";
// import Register from "./components/register/Register";
import NotFound from "./components/NotFound";
// import ContactUs from "./components/contact/ContactUs";
import RegisterOrg from "./components/register/RegisterOrg";
import DefaultLayout from "./layouts/DefaultLayout";
import { useMediaQuery } from "react-responsive";
import MobileLayout from "./layouts/MobileLayout";
import UserEdit from "./components/users/UserEdit";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const isPhone = useMediaQuery({
    query: "(max-width: 768px)",
  });
  const handleLogin = () => {
    setIsLoggedIn(!isLoggedIn);
  };

  const AllRoutes = () => {
    return (
      <Routes>
        <Route path="/" element={<Home isPhone={isPhone} />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/calendar" element={<Calendar />} />
        <Route path="/user-edit" element={<UserEdit />} />
        {/* <Route path="/login" element={<Login onLogin={handleLogin} />} />  */}
        <Route path="/login" element={<Construction />} />
        <Route path="/navigate" element={<Navigate />} />
        <Route path="/register" element={<Construction />} />
        <Route path="/register-org" element={<RegisterOrg />} />
        <Route path="/contact-us" element={<Construction />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/under-construction" element={<Construction />} />
      </Routes>
    );
  };

  return (
    <>
      {isPhone ? (
        <MobileLayout isLoggedIn={isLoggedIn} onLogout={handleLogin}>
          <AllRoutes />
        </MobileLayout>
      ) : (
        <DefaultLayout isLoggedIn={isLoggedIn} onLogout={handleLogin}>
          <AllRoutes />
        </DefaultLayout>
      )}
    </>
  );
}

export default App;
