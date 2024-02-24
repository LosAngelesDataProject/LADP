import { BrowserRouter, Link } from "react-router-dom";

function Footer() {
  return (
    <BrowserRouter>
      <footer className="footer navbar-expand-md navbar-dark bg-dark">
        <div className="container" id="footer">
          <ul className="navbar-nav me-auto mb-2 mb-md-0">
            <li className="nav-item">
              <Link to="/" className="nav-link px-2 text-white link-button">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/aboutus" className="nav-link px-2 text-white link-button">
                About Us
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/register" className="nav-link px-2 text-white link-button"
              > Register
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/login" className="nav-link px-2 text-white link-button"
              > Login
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/caledar" className="nav-link px-2 text-white link-button"
              > Calendar
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/contactus" className="nav-link px-2 text-white link-button"
              > Contact Us
              </Link>
            </li>
          </ul>
        </div>
        <p className="text-white">© 2024 LA Data Project. All rights reserved.</p>
      </footer>
    </BrowserRouter>
  );
}

export default Footer;
