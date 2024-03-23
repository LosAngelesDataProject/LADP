import { BrowserRouter } from "react-router-dom";

function Footer() {
  return (
    <BrowserRouter>
      <ul className="nav nav-tabs justify-content-center small bg-dark">
        <li className="nav-item">
          <a className="text-sm-center nav-link" href="/">
            Home
          </a>
        </li>
        <li className="nav-item">
          <a className="text-sm-center nav-link" href="/about-us">
            About Us
          </a>
        </li>
        <a className="text-sm-center nav-link" href="/register">
          Register
        </a>
        <li className="nav-item">
          <a className="text-sm-center nav-link" href="/login">
            Login
          </a>
        </li>
        <li className="nav-item">
          <a className="text-sm-center nav-link" href="/calendar">
            Calendar
          </a>
        </li>
        <li className="nav-item">
          <a className="text-sm-center nav-link" href="/contact-us">
            Contact Us
          </a>
        </li>
      </ul>
      <p className="flex bg-dark text-white">
        © 2024 LA Data Project. All rights reserved.
      </p>
    </BrowserRouter>
  );
}

export default Footer;
